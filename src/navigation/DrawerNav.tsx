import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import NewPayment from '../screens/NewPayment';
import PaymentList from '../screens/PaymentList';
import Screen3 from '../screens/Screen3';

const DrawerNav = createDrawerNavigator({
  Home: { screen: DashboardScreen },
  NewPayment: { screen: NewPayment },
  PaymentList: { screen: PaymentList },
  Screen3: { screen: Screen3 }
});

export default DrawerNav;
