import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, View, Right, Left, Body } from 'native-base';
import { Props } from '../screens/SingleViewPart';

const ChosenFriendListItem = props => {
  const status = 'done'; //props
  const statusColor =
    status !== 'done' ? (status === 'suggest' ? 'red' : 'yellow ') : 'green';
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#fff',
      borderWidth: 0,
      borderColor: 'transparent',
      height: 28,
      marginVertical: 3,
      marginRight: 0,
      marginLeft: 10,
      borderRadius: 2,
      justifyContent: 'center',
      elevation: 0
    },
    txt: {
      color: '#1d1733',
      fontWeight: '400',
      fontSize: 15
    },
    status: {
      color: statusColor,
      fontWeight: '600',
      marginRight: 20
    }
  });
  return (
    <Button style={styles.btn} disabled={true}>
      <Left style={{ flex: 1 }} />
      <Body style={{ flex: 1 }}>
        <Text style={styles.txt}>{props.name}</Text>
      </Body>
      <Right style={{ flex: 1 }}>
        <Text style={styles.status}>○</Text>
      </Right>
    </Button>
  );
};

export default ChosenFriendListItem;
