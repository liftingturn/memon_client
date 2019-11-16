import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class LodingScreen extends React.Component {
  componentDidMount() {
    console.log('loding screen componentdidmount');
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('loading checkif user:', user);
      // Firebase에 유저 로그인 기록 존재 BOOLEAN. 기록 없으면 loginScreen으로.
      this.props.navigation.navigate(user ? 'DashboardScreen' : 'LoginScreen');
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

export default LodingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
