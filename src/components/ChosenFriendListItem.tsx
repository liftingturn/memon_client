import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Right, Left, Body } from 'native-base';
import { styles_ChosenFrientListItem } from '../screenStyles';
const ChosenFriendListItem = props => {
  //const status = props.isPayed ? '완료' : '대기'; //props
  //  const statusColor = props.status !== 'done' ? '#bba8e0' : '#c2c2c4';
  let status, statusColor, buttonMSG, askBgc, body, confirmDisable;

  if (!props.name) {
    status = props.person.isPayed ? '완납' : '미납'; //props
    statusColor = status === '완료' ? '#bba8e0' : '#c2c2c4';
    buttonMSG = props.askConfirm || props.person.isPayed ? '완납' : '미납';
    confirmDisable = props.person.isPayed ? true : false;
    askBgc = props.askConfirm
      ? 'orange'
      : props.person.isPayed
      ? 'grey'
      : 'yellow';
    body = props.name ? props.name : props.person ? props.person.name : null;
  } else {
    body = '나';
  }

  const styles = StyleSheet.create({
    askConfirm: {
      ...styles_ChosenFrientListItem.askConfirm,
      backgroundColor: askBgc
    },
    status: {
      ...styles_ChosenFrientListItem.status,
      color: statusColor
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
    <Button style={styles_ChosenFrientListItem.btn} disabled={true}>
      <Left style={styles_ChosenFrientListItem.section} />
      <Body style={styles_ChosenFrientListItem.section}>
        <Text style={styles_ChosenFrientListItem.txt}>{body}</Text>
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
