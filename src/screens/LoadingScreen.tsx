import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Footer } from 'native-base';
import * as Font from 'expo-font';
import firebase from 'firebase';
import config from '../../config';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { styles_LoadingScreen } from '../screenStyles';

interface Props {
  navigation: any;
}

class LoadingScreen extends React.Component<Props> {
  async componentDidMount() {
    console.log('loading componentDidMount');
    /* 
    **** 폰트로딩 안내가 잇겠습니다. ^^****
    0. 현재 모든 폰트는 NotoSans_regular 일괄 적용되어 있습니다. (fontFamily로 검색하면 적용된 부분 다 나옴)
    1. 현재 보고 계신 로딩스크린 파일에서는 아래 함수에서 읽어오는 커스텀 폰트를 사용하지 말아주세요!
       커스텀 폰트를 읽는 동안 띄우는 화면입니다.
    2. Roboto_medium 은 native-base 일부 컴포넌트에 기본 적용되는 폰트로, 지우면 어디서 에러가 날지 모르니 따로 쓰지 않는다 싶어도 디폴트로 로딩합니다. ^.ㅜ
    3. 적용할 폰트를 선택하신 후에는 
      1) 루트 디렉토리의 assets 폴더에서 미사용 폰트 파일 삭제
      2) 아래 Font.loadAsync 에서 미사용 폰트 로딩을 삭제해주세염.
    */
    await Font.loadAsync({
      Roboto_medium: require('../../assets/Fonts/Roboto_medium.ttf'),
      NotoSans_normal: require('../../assets/Fonts/KaiGenGothicK-Normal.ttf'),
      NotoSans_medium: require('../../assets/Fonts/KaiGenGothicK-Medium.ttf'),
      NotoSans_bold: require('../../assets/Fonts/KaiGenGothicK-Bold.ttf'),
      NotoSans_heavy: require('../../assets/Fonts/KaiGenGothicK-Heavy.ttf')
    });
    this.checkIfLoggedIn();
  }

  phoneExist = async email => {
    let emailObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    };

    let response = await fetch(config.serverAddress + '/users/email', emailObj);
    console.log('response', response);
    let responseJson = await response.json();
    console.log('responseJson', typeof responseJson.result);
    return responseJson.result;
  };

  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(async user => {
      console.log('loading checkif user:', user);
      // Firebase에 유저 로그인 기록 존재 BOOLEAN. 기록 없으면 loginScreen으로.
      let result = user ? await this.phoneExist(user.email) : null; // ** 휴대폰 캐시 지운 상태 혹은 최초 로그인 시, 최초 user = null 인 상태에서 함수 실행되지 말아야 함

      //user가 있으면 이제 전화번호 등록으로 넘어감.
      //user가 있는데, DB에 번호도 있는 경우는 phoneInput skip하고 바로 Dashboard로 간다?
      console.log('result 서버에 이메일있냐 없냐 이말이야: ', result);
      this.props.navigation.navigate(
        !user ? 'LoginScreen' : result ? 'DrawerNav' : 'PhoneInputScreen'
      );
    });
  };

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles_LoadingScreen.sub}
          >
            슬기로운 수금 생활
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles_LoadingScreen.main}
          >
            Memon
          </Text>
          <ActivityIndicator size="large" />
        </View>
        <Footer style={styles_LoadingScreen.footer}>
          <Text style={styles_LoadingScreen.footerTxt}>@ Don Juan 2019</Text>
        </Footer>
      </LinearGradient>
    );
  }
}

export default LoadingScreen;
