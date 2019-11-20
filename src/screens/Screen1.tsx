import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface Props {}

export interface State {}

class Screen1 extends React.Component<Props, State> {
  state = { key: 'value' };
  render() {
    return (
      <View style={this.styles.container}>
        <Text>screen1</Text>
      </View>
    );
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
}

export default Screen1;
