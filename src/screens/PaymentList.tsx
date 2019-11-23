import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface Props {}

export interface State {}

export default class PaymentList extends React.Component<Props, State> {
  state = { key: 'value' };
  render() {
    return (
      <View style={this.styles.container}>
        <Text>PAYMENTLIST</Text>
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
