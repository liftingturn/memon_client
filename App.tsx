import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Button, Left, Right } from 'native-base';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import PhoneInputScreen from './src/screens/PhoneInputScreen';
import * as firebase from 'firebase';
import firebaseConfig from './config';
import DashboardScreen from './src/screens/DashboardScreen';
import NewPayment from './src/screens/NewPayment';
import PaymentList from './src/screens/PaymentList';
import SingleViewPart from './src/screens/SingleViewPart';
console.disableYellowBox = true;
firebase.initializeApp(firebaseConfig);
const { width } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

// const AuthStack = createStackNavigator({
//   홈: {
//     screen: DashboardScreen
//   },
//   새거래: {
//     screen: NewPayment
//   },
//   거래목록: {
//     screen: PaymentList
//   },
//   참여거래정보: {
//     screen: SingleViewPart
//   }
// });

const CustomDrawer = props => {
  //Setting up the Main Top Large Image of the Custom Sidebar
  // console.log('커스텀드로워 프롭스', props.navigation);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'flex-end',
          paddingTop: '10%',
          paddingRight: '10%'
        }}
      >
        <Button
          onPress={props.navigation.toggleDrawer}
          style={{ backgroundColor: 'transparent', elevation: 0 }}
        >
          <FontAwesome name="chevron-left" size={25} color="#b582e8" />
        </Button>
      </View>
      <View
        style={{
          height: 250,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 20, marginTop: '5%', fontWeight: '100' }}>
          Memento Money
        </Text>
        <TouchableOpacity style={{ marginTop: '12%' }}>
          <Button
            style={{
              borderColor: '#f5f5f5',
              paddingHorizontal: 10,
              height: 30,
              borderRadius: 10,
              borderWidth: 2,
              backgroundColor: '#fff'
            }}
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.navigation.navigate('LoadingScreen');
                })
                .catch(error => {
                  // An error happened.
                  alert(error);
                });
            }}
          >
            <Text style={{ color: '#b582e8' }}>Sign out</Text>
          </Button>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginHorizontal: '10%' }}>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};
const Drawer = createDrawerNavigator(
  {
    홈: DashboardScreen,
    새거래: NewPayment,
    거래목록: PaymentList,
    참여거래정보: SingleViewPart
  },
  {
    unmountInactiveRoutes: true,
    contentComponent: CustomDrawer,
    drawerWidth: width * 0.7,
    contentOptions: {
      activeTintColor: '#b582e8'
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  Drawer: Drawer,
  PhoneInputScreen: PhoneInputScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
