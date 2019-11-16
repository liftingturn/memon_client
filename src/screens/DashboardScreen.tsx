import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Iprops {}

interface State {
  moneyToPay: number;
  moneyToGet: number;
}
class DashboardScreen extends React.Component<Iprops, State> {
  constructor(props) {
    super(props);

    this.state = {
      moneyToPay: 0,
      moneyToGet: 0
    };
  }

  // async componentDidMount() {
  //   try{
  //    const newState =  await axios
  //    .get('something url')
  //    .then(res =>
  //      {
  //        moneyToPay: res.data.moneyToPay,
  //        moneyToGet: res.data.moneyToGet
  //      }
  //    )
  //   }catch(err) {
  //     console.log(err)
  //   }

  //   this.setState(newState);
  // }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>
          줄돈 {this.state.moneyToPay}
          받을돈{this.state.moneyToGet}
        </Text>
      </View>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
