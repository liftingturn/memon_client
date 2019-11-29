import React from 'react';
import { Text } from 'react-native';
import { Header, Left, Button, Icon, Body, Right } from 'native-base';
import { screenStyles } from '../screenStyles';

const DrawerHeader = props => {
  return (
    <Header style={screenStyles.header}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={props.toggleDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body style={{ flex: 2, alignItems: 'center' }}>
        <Text style={screenStyles.headerBodyText}>{props.title}</Text>
      </Body>
      <Right style={{ flex: 1 }} />
    </Header>
  );
};

export default DrawerHeader;
