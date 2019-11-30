import React from 'react';
import { Text } from 'react-native';
import { Item } from 'native-base';
const NetCardElement = props => {
  return (
    <Item
      style={{
        flex: 1,
        elevation: 1,
        margin: 5,
        padding: 5,
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 15,
          color: 'grey',
          flex: 1.5,
          borderRightWidth: 2,
          borderRightColor: '#907ee0',
          textAlign: 'center'
        }}
      >
        {props.label}
      </Text>
      <Text
        style={{
          flex: 2.5,
          fontSize: 17,
          color: 'darkgrey',
          textAlign: 'center'
        }}
      >
        {props.money}원
      </Text>
    </Item>
  );
};

export default NetCardElement;
