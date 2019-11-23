import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from './../components/CardComponent';
import config from './../../config';
import firebase from 'firebase';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Footer,
  FooterTab
} from 'native-base';

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
      <Container style={this.styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.toggleDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>Header</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>This is Content Section</Text>
          <CardComponent
            header={'net'}
            body={`받을 돈 : ${this.state.moneyToGet}\n줄 돈 : ${this.state.moneyToPay}`}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
              <View style={this.styles.button}>
                <Button full onPress={this.moveToNewPayment}>
                  <Text>새 글 생성</Text>
                </Button>
              </View>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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
    }
  });
}
