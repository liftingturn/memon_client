import * as React from 'react';
import { Button, Body } from 'native-base';
import { View, Text, Modal, StyleSheet } from 'react-native';
import FriendList from './FriendList';

interface Props {
  printModal: boolean;
  modalSwitch: () => void;
  handleSelect: Function;
  friendList: object[];
}
export default class FriendListModal extends React.Component<Props> {
  requestClose = () => {
    console.log('Modal has been closed.');
  };

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.printModal}
        onRequestClose={this.requestClose}
      >
        <View style={this.styles.modal}>
          <FriendList
            handleSelect={this.props.handleSelect}
            friendList={this.props.friendList}
          />
          <Button style={this.styles.btn} onPress={this.props.modalSwitch}>
            <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={this.styles.txt}>Done</Text>
            </Body>
          </Button>
        </View>
      </Modal>
    );
  }

  styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      // alignItems: 'center',
      padding: 33
    },
    btn: {
      backgroundColor: '#907ee0'
    },
    txt: {
      color: '#f5effb'
    }
  });
}
