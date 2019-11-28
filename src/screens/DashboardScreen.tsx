import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NetCard, DrawerHeader } from '../components';
import config from './../../config';
import firebase from 'firebase';
import screenStyles from '../screenStyles';

import { Container, Content, Button } from 'native-base';

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
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
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
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <Container style={screenStyles.container}>
          <DrawerHeader title="Dashboard" toggleDrawer={this.toggleDrawer} />

          <Content
            style={{ backgroundColor: 'transparent' }}
            scrollEnabled={false}
          >
            <NetCard
              header={'net'}
              body={`받을 돈 : ${this.state.moneyToGet}\n줄 돈 : ${this.state.moneyToPay}`}
            />
          </Content>

          <Button
            rounded
            style={this.styles.botbut}
            onPress={this.moveToNewPayment}
          >
            <Text>결제 생성</Text>
          </Button>
        </Container>
      </LinearGradient>
    );
  }

  styles = StyleSheet.create({
    container: {
      marginTop: 23,
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center'
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
    },
    botbut: {
      marginLeft: 150,
      width: 100,
      textAlign: 'center',
      marginBottom: 10
    }
  });
}
