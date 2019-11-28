import React from 'react';
import { Text, BackHandler, Alert } from 'react-native';
import { Button } from 'native-base';

interface Props {
  label: string;
  onPress: () => void;
  goBack: () => void;
}

export default class ButtonModify extends React.Component<Props> {
  handleBackPress = async () => {
    if (this.props.label === '변경사항저장') {
      await Alert.alert('Alert', '수정을 취소합니다.', [
        {
          text: '확인',
          onPress: () => {
            console.log('ok');
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
      <Button onPress={this.props.onPress}>
        <Text>{this.props.label}</Text>
      </Button>
    );
  }
}
