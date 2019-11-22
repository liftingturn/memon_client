import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from './../components/CardComponent';
import config from './../../config';
import firebase from 'firebase';
import { Container, Header, Content, Button, Icon } from 'native-base';

interface Props {
  navigation: any;
}
interface State {
  moneyToPay: string;
  moneyToGet: string;
  uri: string;
}
export default class DashboardScreen extends Component<Props, State> {
  state: State = {
    moneyToPay: '',
    moneyToGet: '',
    uri: ''
  };
  moveToNewPayment = () => {
    this.props.navigation.navigate('NewPayment');
  };
  async componentDidMount() {
    const fetchAdd = config.serverAddress + '/main';

    try {
      const user = await firebase.auth().currentUser;

      const fetchData = await fetch(fetchAdd, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email
        })
      });
      const parsedMoneyData = await fetchData.json();
      this.setState({
        moneyToPay: parsedMoneyData.moneyToPay,
        moneyToGet: parsedMoneyData.moneyToGet
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    console.log('================enter dashboard');
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topCon} />
        <View style={this.styles.bottomCon}>
          <CardComponent
            header={'net'}
            body={`받을 돈 : ${this.state.moneyToGet}\n줄 돈 : ${this.state.moneyToPay}`}
          />
        </View>
        <View style={this.styles.button}>
          <Button full onPress={this.moveToNewPayment}>
            <Text>새 글 생성</Text>
          </Button>
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
      flex: 4
    },
    button: {
      flex: 1,
      justifyContent: 'flex-end'
    }
  });
}
