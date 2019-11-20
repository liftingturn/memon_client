import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from './../components/CardComponent';

interface Props {}
interface State {
  moneyToPay: number;
  moneyToGet: number;
  fontLoaded: boolean;
}
export default class DashboardScreen extends Component<Props, State> {
  state: State = {
    moneyToPay: 0,
    moneyToGet: 0,
    fontLoaded: false
  };

  componentDidMount() {
    fetch('http://12f56b64.ngrok.io/main', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        //여기서 데이터갖고 STATE갈아주면 된다.
        this.setState({
          moneyToPay: data.moneyToPay,
          moneyToGet: data.moneyToGet
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topCon} />
        <View style={this.styles.bottomCon}>
          <CardComponent
            header={'net'}
            body={`받을 돈 : ${this.state.moneyToGet}\n줄 돈 : ${this.state.moneyToPay}`}
          />
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
