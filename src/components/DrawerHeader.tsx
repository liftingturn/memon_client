import React from 'react';
import { Text } from 'react-native';
import { Header, Left, Button, Icon, Body, Right, Title } from 'native-base';
import { screenStyles } from '../screenStyles';

const DrawerHeader = props => {
  return (
    <Header style={{ ...screenStyles.header }}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={props.toggleDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Title
        style={{
          paddingTop: 22,
          alignItems: 'center',
          fontFamily: 'Godo',
          fontSize: 25
        }}
      >
        {/* <Text style={{ ...screenStyles.headerBodyText, fontFamily: 'GodoB' }}> */}
        {props.title}
        {/* </Text> */}
      </Title>
      <Right style={{ flex: 1 }} />
    </Header>
  );
};

export default DrawerHeader;
