import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, View } from 'native-base';

const ChosenFriendListItem = props => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#b582e8',
      height: 28,
      marginVertical: 3,
      marginRight: 10,
      marginLeft: 22,
      borderRadius: 2,
      justifyContent: 'center'
    },
    txt: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 15
    }
  });
  return (
    <Button style={styles.btn} disabled={true}>
      <Text style={styles.txt}>{props.name}</Text>
    </Button>
  );
};

export default ChosenFriendListItem;
