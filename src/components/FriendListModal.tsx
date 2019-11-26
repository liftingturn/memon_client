import * as React from 'react';
import { Button } from 'native-base';
import { View, Text, Modal, StyleSheet } from 'react-native';
import FriendList from './FriendList';

interface Props {
  printModal: boolean;
  modalSwitch: () => void;
  handleChosen: Function;
  chosen: object[];
}
export default class FriendListModal extends React.Component<Props> {
  state = { chosen: [] };

  addChosen = chosenP => {
    this.props.handleChosen(chosenP);
    console.log(chosenP);
  };
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
        {/*Animation can be slide, slide, none*/}
        <View style={this.styles.modal}>
          <FriendList addChosen={this.addChosen} chosen={this.props.chosen} />
          <Button
            info
            style={{
              alignSelf: 'center',
              padding: '10%'
            }}
            onPress={this.props.modalSwitch}
          >
            <Text>확인</Text>
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
      padding: 50
    }
  });
}
