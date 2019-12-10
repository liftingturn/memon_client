import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Footer, Icon, Button } from 'native-base';
// import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import firebase from 'firebase';
import config from './../../config';
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface Props {
  navigation: any;
}
interface State {
  whileAsync: boolean;
  user: any;
}

class LoginScreen extends React.Component<Props, State> {
  state: State = {
    whileAsync: false,
    user: null
  };

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: config.androidClientId,
      webClientId: config.webClientId
    });
    await this._syncUserWithStateAsync();
  };
  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ ...this.state, user: user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ ...this.state, user: null });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.uid
          //providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = async googleUser => {
    console.log('googe user get in firebase', googleUser.user);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      // auth change시 실행할 function 주입.
      async firebaseUser => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          //현재 로그인하려는 구글 유저와, 파이어베이스에 등록된 유저가 같지 않다? -> 해당 앱에 처음 로그인한 유저
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            //googleUser.getAuthResponse().id_token
            googleUser.user.auth.idToken,
            googleUser.user.auth.accessToken
          ); // 파이어베이스에 등록할 구글 유저정보 기반 credential 정보 생성.
          // Sign in with credential from the Google user.
          await firebase
            .auth()
            .signInWithCredential(credential) // 방금
            .then(result => {
              console.log('user signed in===================', result); //firebase에 방금 처음 로그인한 구글 유저정보 등록완료!!
              if (result.additionalUserInfo.isNewUser) {
                // this.props.navigation.navigate('LoadingScreen');
                this.props.navigation.navigate('PhoneInputScreen');
              } else {
              }

              ////////////////
              // PhoneInputScreen 으로 분기
              // user 정보가 우리 서버에 있는지 확인 (핸드폰 번호가 있는지 확인)
              //  - 있다면,
              // this.props.navigation.navigate('PhoneInputScreen');
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              alert('firebase 인증실패' + error);
            });
        } else {
          //파이어베이스에 로그인 기록 있는 경우
          alert('로그인 성공');
          this.props.navigation.navigate('Drawer');
          console.log('User already signed-in Firebase.');
        }
      }
    );
  };
  signInWithGoogleAsync = async () => {
    console.log('google login clicked');
    this.setState({ ...this.state, whileAsync: true });
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const result = await GoogleSignIn.signInAsync();
      // const result = await Google.logInAsync({
      //   //google id 관련 object날라옴/
      //   androidClientId: config.androidClientId,
      //   // androidStandaloneAppClientId: config.androidStandaloneAppClientId,
      //   scopes: ['profile', 'email'],
      //   clientId: config.androidClientId
      // });

      if (result.type === 'success') {
        await this.onSignIn(result); //call the onSignIn method
        console.log('login screen onsignin end');
        // this.props.navigation.navigate('Drawer');
        return result.user.auth.accessToken; //who receive the result??
      } else {
        this.setState({ ...this.state, whileAsync: false });
        console.log('google.loginAsync 실패, result:', result);
        return { cancelled: true };
      }
    } catch (e) {
      this.setState({ ...this.state, whileAsync: false });
      console.log('in catch err', e);
      return { error: true };
    }
  };
  async componentDidMount() {
    await this.initAsync();
  }
  check = () => {};

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.sub}>
            슬기로운 수금 생활
          </Text>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.main}>
            Memon
          </Text>
          <View style={styles.button}>
            {this.state.whileAsync === false ? (
              <Button
                // onPress={this.signInWithGoogleAsync}
                onPress={this.signInWithGoogleAsync}
                style={{ ...styles.button, backgroundColor: '#4285F4' }}
              >
                <Icon type="AntDesign" name="google"></Icon>
                <Text style={{ color: 'white', marginRight: 20 }}>
                  구글 아이디로 접속
                </Text>
              </Button>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        </View>
        <Footer
          style={{ justifyContent: 'center', backgroundColor: 'transparent' }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '400' }}>
            @ Don Juan 2019
          </Text>
        </Footer>
      </LinearGradient>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sub: {
    backgroundColor: 'transparent',
    fontWeight: '300',
    color: '#fff',
    fontSize: RFPercentage(3)
  },
  main: {
    backgroundColor: 'transparent',
    fontWeight: '500',
    color: '#fff',
    fontSize: RFPercentage(8)
  },
  button: {
    marginTop: 100
  }
});
