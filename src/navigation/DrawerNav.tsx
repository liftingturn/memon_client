import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import NewPayment from '../screens/NewPayment';
import PaymentList from '../screens/PaymentList';
import Profile from '../screens/Profile';
import { Button } from 'native-base';
import FriendScreen from '../screens/FriendScreen';
import SingleView from '../screens/SingleView';
import SingleViewPart from '../screens/SingleViewPart';

const DrawerNav = createDrawerNavigator({
  Home: { screen: DashboardScreen },
  NewPayment: { screen: NewPayment },
  PaymentList: { screen: PaymentList },
  내프로필: { screen: Profile },
  친구목록: { screen: FriendScreen },
  개별결제페이지: { screen: SingleView },
  참여자개별결제페이지: { screen: SingleViewPart }
  // Logout : <Button></Button>
});

export default DrawerNav;
