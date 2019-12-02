import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Right, Left, Body } from 'native-base';
import { Props } from '../screens/SingleViewPart';

const ChosenFriendListItem = props => {
  //const status = props.isPayed ? '완료' : '대기'; //props
  //  const statusColor = props.status !== 'done' ? '#bba8e0' : '#c2c2c4';
  let status, statusColor, buttonMSG, askBgc, body, confirmDisable;

  if (!props.name) {
    status = props.person.isPayed ? '완납' : '미납'; //props
    statusColor = status === '완료' ? '#bba8e0' : '#c2c2c4';
    buttonMSG = props.askConfirm || props.person.isPayed ? '완료' : '입금확인';
    confirmDisable = props.person.isPayed ? true : false;
    askBgc = props.askConfirm ? 'orange' : 'yellow';
    body = props.name ? props.name : props.person ? props.person.name : null;
  } else {
    body = '나';
  }

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
      marginRight: 10,
      paddingHorizontal: 10,
      height: 19,
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
  console.log('= =======쵸즌리스트아이템 프롭스=======', props);

  const { modifyButtonText } = props;
  //화면모드
  console.log(modifyButtonText);
  let mode =
    modifyButtonText === '변경사항저장' //'수정' || '거래 종료' || '확인'
      ? 'modify'
      : modifyButtonText === '등록' || !modifyButtonText
      ? 'new'
      : 'view';

  console.log('mode', mode);
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
        {props.name ? null : mode === 'new' ? ( //나 //새결제
          <Text style={styles.status}>{status}</Text>
        ) : mode === 'view' ? ( //조회
          <Text style={styles.status}>{status}</Text>
        ) : (
          // 수정모드
          <Button
            onPress={handleCheckPay}
            style={styles.askConfirm}
            disabled={confirmDisable}
          >
            <Text>{buttonMSG}</Text>
          </Button>
        )}
      </Right>
    </Button>
  );
};

export default ChosenFriendListItem;
