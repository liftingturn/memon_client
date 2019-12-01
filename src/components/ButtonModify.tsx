import React from 'react';
import { Text, BackHandler, Alert } from 'react-native';
import { Button } from 'native-base';

interface Props {
  label: string;
  onPress: () => void;
  goBack: () => void;
  handleConfirm: () => void;
}

export default class ButtonModify extends React.Component<Props> {
  onPress = () => {
    if (this.props.label === '변경사항저장') {
      this.props.handleConfirm();
      this.props.onPress();
    } else {
      this.props.onPress();
    }
  };

  handleBackPress = async () => {
    if (this.props.label === '변경사항저장') {
      await Alert.alert('Alert', '수정을 취소합니다.', [
        {
          text: '확인',
          onPress: () => {
            this.props.goBack();
          }
        },
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]);
      return true;
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <Button onPress={this.onPress}>
        <Text>{this.props.label}</Text>
      </Button>
    );
  }
}
