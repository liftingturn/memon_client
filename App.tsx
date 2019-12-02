import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import DrawerNav from './src/navigation/DrawerNav';
import PhoneInputScreen from './src/screens/PhoneInputScreen';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state: {
    fontsLoaded: false;
  };
  async componentDidMount() {
    await Font.loadAsync({
      BMHANNAAir: require('./assets/Fonts/BMDOHYEON_ttf.ttf'),
      Godo: require('./assets/Fonts/GodoM.ttf'),
      GodoB: require('./assets/Fonts/GodoB.ttf'),
      Roboto_medium: require('./assets/Fonts/Roboto_medium.ttf')
    });
    this.setState({ ...this.state, fontsLoaded: true });
  }

  render() {
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DrawerNav: DrawerNav,
  PhoneInputScreen: PhoneInputScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
