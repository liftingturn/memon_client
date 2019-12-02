import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button
} from 'react-native';
import { Footer } from 'native-base';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import config from './../../config';
import { LinearGradient } from 'expo-linear-gradient';

interface State {
  whileAsync: boolean;
}

class LoginScreen extends React.Component<State> {
  state: State = {
    whileAsync: false
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      // auth change시 실행할 function 주입.
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          //현재 로그인하려는 구글 유저와, 파이어베이스에 등록된 유저가 같지 않다? -> 해당 앱에 처음 로그인한 유저
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            //googleUser.getAuthResponse().id_token
            googleUser.idToken,
            googleUser.accessToken
          ); // 파이어베이스에 등록할 구글 유저정보 기반 credential 정보 생성.
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential) // 방금
            .then(() => {
              console.log('user signed in'); //firebase에 방금 처음 로그인한 구글 유저정보 등록완료!!
              ////////////////
              // PhoneInputScreen 으로 분기
              // user 정보가 우리 서버에 있는지 확인 (핸드폰 번호가 있는지 확인)
              //  - 있다면,
              this.props.navigation.navigate('PhoneInputScreen');
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
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    console.log('google login clicked');
    this.setState({ whileAsync: true });
    try {
      const result = await Google.logInAsync({
        //google id 관련 object날라옴/
        androidClientId: config.androidClientId,
        scopes: ['profile', 'email'],
        clientId: ''
      });

      if (result.type === 'success') {
        console.log('result:', result);
        this.onSignIn(result); //call the onSignIn method
        console.log('login screen onsignin end');

        return result.accessToken; //who receive the result??
      } else {
        this.setState({ whileAsync: false });
        console.log('google.loginAsync 실패, result:', result);
        return { cancelled: true };
      }
    } catch (e) {
      this.setState({ whileAsync: false });
      console.log('in catch err', e);
      return { error: true };
    }
  };

  check = () => {};

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              fontStyle: 'italic',
              fontWeight: '300',
              color: '#fff'
            }}
          >
            슬기로운 수금 생활
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              backgroundColor: 'transparent',
              fontSize: 60,
              fontStyle: 'italic',
              fontWeight: '500',
              color: '#fff'
            }}
          >
            Memon
          </Text>
          {this.state.whileAsync === false ? (
            <Button
              title="Sign In With Google"
              onPress={this.signInWithGoogleAsync}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <Footer
          style={{ justifyContent: 'center', backgroundColor: 'transParent' }}
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
  }
});
