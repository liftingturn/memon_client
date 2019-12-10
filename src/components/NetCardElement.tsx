import React from 'react';
import { Text } from 'react-native';
import { Item } from 'native-base';
import { styles_NetCard } from '../screenStyles';
const NetCardElement = props => {
  const price = props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const itemStyle =
    props.get === 'get'
      ? styles_NetCard.elementLabelGet
      : styles_NetCard.elementItem;
  return (
    <Item style={itemStyle}>
      <Text style={styles_NetCard.elementLabel}>{props.label}</Text>
      <Text style={styles_NetCard.elementMoney}>{price} 원</Text>
    </Item>
  );
};

export default NetCardElement;
