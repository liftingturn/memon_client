import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

interface Props {
  clicked: string;
  unClicked: string;
  handleEvent: Function;
  arg: any;
}

export default class ButtonChoice extends React.Component<Props> {
  state = { clicked: false };

  handleClick = () => {
    this.props.handleEvent(this.props.arg);
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return !this.state ? (
      ''
    ) : this.state.clicked ? (
      <Button
        warning
        style={{ marginRight: 15, padding: 5 }}
        onPress={this.handleClick}
      >
        <Text>{this.props.clicked}</Text>
      </Button>
    ) : (
      <Button
        light
        style={{ marginRight: 15, padding: 5 }}
        onPress={this.handleClick}
      >
        <Text>{this.props.unClicked}</Text>
      </Button>
    );
  }
}
