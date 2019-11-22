import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import config from './../../config';
import firebase from 'firebase';

interface Props {
  navigation: any;
}

interface State {
  phoneNumber: string;
}

export default class PhoneInputScreen extends React.Component<Props, State> {
  state: State = {
    phoneNumber: ''
  };

  //profile avatar 랜덤 생성 함수

  //파이어베이스 유저 이메일 가져오기 || 구글 로그인 시점에 저장해두기
  randomAvatar = () => {
    return (
      'https://api.adorable.io/avatars/' + Math.floor(Math.random() * 5000)
    );
  };

  signup = async (phoneNumber, email) => {
    let signupBody = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email, //토큰에서 email 긁거나 통과!
        phone: phoneNumber,
        avatar: this.randomAvatar() //귣?
      })
    };
    try {
      let signupResult = await fetch(
        config.serverAddress + '/signup',
        signupBody
      );
      if (!signupResult.ok) {
        throw signupResult;
      } else {
        let data = await signupResult.json();
        console.log('result------', data);
        return true;
      }
    } catch (e) {
      if (e.status === 400) {
        console.log('email change please');
        alert('email change please');
        return false;
      }
      //500일때 로그아웃처리, 구글로그인 페이지로 날려주는 처리 해줘야 할 듯...
      console.log('error throws success');
      return false;
    }
  };

  submitPhoneNumber = async () => {
    console.log('phone to server', this.state.phoneNumber);
    var user = await firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      // email = email;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;

      console.log('exist user not null email', email);
      if (await this.signup(this.state.phoneNumber, email)) {
        console.log('회원가입 성공~ loading screen으로 갑니다');
        this.props.navigation.navigate('LoadingScreen');
        // return 'did';
      }
    } else {
    }
    // console.log('click')
    // return 'good';
  };

  onChangeEvent = e => {
    console.log('onchange do', e.nativeEvent.text);
    this.setState({ phoneNumber: e.nativeEvent.text });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topContainer}>
          <Text> </Text>
          <Text> </Text>

          <Text>memon 이용을 위해 추가정보를 입력해주세요.</Text>
        </View>
        <View style={this.styles.formAlign}>
          <Item error style={this.styles.item}>
            <Input
              style={this.styles.input}
              placeholder="01011112222"
              placeholderTextColor="#8f6fa6"
              keyboardType="numeric"
              onChange={this.onChangeEvent}
              onSubmitEditing={this.submitPhoneNumber}
              // /Success Input
            />
            <Icon
              name="checkmark-circle"
              style={{ color: '#5f3363' }}
              onPress={this.submitPhoneNumber}
            />
          </Item>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    topContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    formAlign: {
      flex: 2,
      //   justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      width: 300
      // borderColor: 'grey'
    },
    input: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#141414',
      fontSize: 20
    }
  });
}
