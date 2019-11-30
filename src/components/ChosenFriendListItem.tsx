import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Right, Left, Body } from 'native-base';
import { Props } from '../screens/SingleViewPart';

const ChosenFriendListItem = props => {
  //const status = props.isPayed ? '완료' : '대기'; //props
  //  const statusColor = props.status !== 'done' ? '#bba8e0' : '#c2c2c4';

  const status = props.isPayed ? '완료' : '대기'; //props
  const statusColor = status === '완료' ? '#bba8e0' : '#c2c2c4';
  const buttonMSG = props.askConfirm ? '완료' : '입금확인';
  const askBgc = props.askConfirm ? 'orange' : 'yellow';
  const body = props.name
    ? props.name
    : props.person
    ? props.person.name
    : null;
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
    payedModify: {
      color: '#bba8e0',
      fontWeight: '600',
      marginRight: 20
    },
    askConfirm: {
      height: 15,
      backgroundColor: askBgc
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
  console.log('========쵸즌리스트아이템 프롭스=======', props);

  const handleCheckPay = () => {
    props.changePayed(props.person.phone);
  };

  return (
    <Button style={styles.btn} disabled={true}>
      <Left style={styles.section} />
      <Body style={styles.section}>
        <Text style={styles.txt}>{body}</Text>
      </Body>
      <Right style={styles.section}>
        {props.name !== '나' ? (
          props.mode === '단일 결제 정보' ? (
            props.uniqueDisable ? (
              //조회모드
              <Text style={styles.status}>{status}</Text>
            ) : (
              // 수정모드
              <Button onPress={handleCheckPay} style={styles.askConfirm}>
                <Text>{buttonMSG}</Text>
              </Button>
            )
          ) : (
            //입력모드
            <Text style={styles.status}>{status}</Text>
          )
        ) : null}
      </Right>
    </Button>
  );
};

export default ChosenFriendListItem;
