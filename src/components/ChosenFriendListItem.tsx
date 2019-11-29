import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, View, Right, Left, Body } from 'native-base';
import { Props } from '../screens/SingleViewPart';

const ChosenFriendListItem = props => {
  //const status = props.status ? '완료' : '대기'; //props
  //  const statusColor = props.status !== 'done' ? '#bba8e0' : '#c2c2c4';

  const status = props.name === '최방실' ? '완료' : '대기'; //props
  const statusColor = status === '완료' ? '#bba8e0' : '#c2c2c4';
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: '#bba8e0',
      borderBottomWidth: 1,
      height: 28,
      marginVertical: 3,
      marginRight: 0,
      marginLeft: 10,
      borderRadius: 2,
      justifyContent: 'center',
      elevation: 0
    },
    txt: {
      color: 'grey',
      fontWeight: '400',
      fontSize: 15
    },
    status: {
      color: statusColor,
      fontWeight: '600',
      marginRight: 20
    },
    section: {
      flex: 1
    }
  });
  return (
    <Button style={styles.btn} disabled={true}>
      <Left style={styles.section} />
      <Body style={styles.section}>
        <Text style={styles.txt}>{props.name}</Text>
      </Body>
      <Right style={styles.section}>
        {props.name !== '나' ? (
          <Text style={styles.status}>{status}</Text>
        ) : null}
      </Right>
    </Button>
  );
};

export default ChosenFriendListItem;
