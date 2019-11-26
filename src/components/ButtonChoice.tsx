import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

interface Props {
  clickedLabel: string;
  unClickedLabel: string;
  handleChoose: Function;
  arg: any;
  clicked: boolean;
}

export default class ButtonChoice extends React.Component<Props> {
  state = { clicked: this.props.clicked };

  handlePress = () => {
    this.props.handleChoose(this.props.arg);
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return !this.state ? (
      ''
    ) : this.state.clicked ? (
      <Button
        warning
        style={{ marginRight: 15, padding: 5 }}
        onPress={this.handlePress}
      >
        <Text>{this.props.clickedLabel}</Text>
      </Button>
    ) : (
      <Button
        light
        style={{ marginRight: 15, padding: 5 }}
        onPress={this.handlePress}
      >
        <Text>{this.props.unClickedLabel}</Text>
      </Button>
    );
  }
}
