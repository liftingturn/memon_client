import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from './../components/CardComponent';

interface Props {}
interface State {
  MoneyToPay: number;
  MoneyToGet: number;
  fontLoaded: boolean;
}
export default class DashboardScreen extends Component<Props, State> {
  state: State = {
    MoneyToPay: 0,
    MoneyToGet: 0,
    fontLoaded: false
  };
  net = `받을 돈 : ${this.state.MoneyToGet}\n줄 돈 : ${this.state.MoneyToPay}`;
  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topCon} />
        <View style={this.styles.bottomCon}>
          <CardComponent header={'net'} body={this.net} />
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    topCon: {
      flex: 1
    },
    bottomCon: {
      flex: 2
    }
  });
}
