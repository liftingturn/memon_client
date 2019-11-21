import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import LoginScreen from './LoginScreen';
import PhoneInputScreen from './PhoneInputScreen';
import config from '../../config';

interface Props {
  navigation: any;
}

class LoadingScreen extends React.Component<Props> {
  componentDidMount() {
    console.log('loading componentDidMount');
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});