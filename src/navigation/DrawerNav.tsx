import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import NewPayment from '../screens/NewPayment';
import PaymentList from '../screens/PaymentList';
import Profile from '../screens/Profile';
import { Button } from 'native-base';

const DrawerNav = createDrawerNavigator({
  Home: { screen: DashboardScreen },
  NewPayment: { screen: NewPayment },
  PaymentList: { screen: PaymentList },
  Profile: { screen: Profile }
  // Logout : <Button></Button>
});

export default DrawerNav;
