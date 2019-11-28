import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

interface Props {
  clickedLabel: string;
  unClickedLabel: string;
  handleSelect: Function;
  phone: string;
  clicked: boolean;
}

export default class ButtonChoice extends React.Component<Props> {
  state = { clicked: this.props.clicked };

  handlePress = () => {
    console.log('select Phone: ', this.props);

    this.props.handleSelect(this.props.phone);
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return !this.state ? (
      <Text></Text>
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
