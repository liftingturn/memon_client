import React from 'react';
import { Text, BackHandler, Alert } from 'react-native';
import { Button } from 'native-base';

interface Props {
  label: string;
  onPress: () => void;
  handleConfirm: () => void;
}

export default class ButtonModify extends React.Component<Props> {
  onPress = () => {
    // if (this.props.label === '변경사항저장') {
    //   this.props.handleConfirm();
    //   this.props.onPress();
    // } else {
    //   this.props.onPress();
    // }
    this.props.onPress();
  };

  render() {
    return (
      // <Button onPress={this.onPress}>
         <Button onPress={this.props.onPress}>
        <Text>{this.props.label}</Text>
      </Button>
    );
  }
}
