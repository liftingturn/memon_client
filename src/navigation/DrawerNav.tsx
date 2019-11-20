import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';

const DrawerNav = createDrawerNavigator({
  Home: { screen: DashboardScreen },
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 },
  Screen3: { screen: Screen3 }
});

export default DrawerNav;
