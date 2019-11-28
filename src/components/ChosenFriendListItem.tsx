import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, View, Right, Left } from 'native-base';
import { Props } from '../screens/SingleViewPart';

const ChosenFriendListItem = props => {
  const status = 'done'; //props
  const statusColor =
    status !== 'done' ? (status === 'suggest' ? 'red' : 'yellow ') : 'green';
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#e7e6eb',
      height: 28,
      marginVertical: 3,
      marginRight: 10,
      marginLeft: 22,
      borderRadius: 2,
      justifyContent: 'center'
    },
    txt: {
      color: '#1d1733',
      fontWeight: '400',
      fontSize: 15,
      marginLeft: 20
    },
    status: {
      color: statusColor,
      fontWeight: '600',
      marginRight: 20
    }
  });
  return (
    <Button style={styles.btn} disabled={true}>
      <Left>
        <Text style={styles.txt}>{props.name}</Text>
      </Left>
      <Right>
        <Text style={styles.status}>○</Text>
      </Right>
    </Button>
  );
};

export default ChosenFriendListItem;
