import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon
} from 'native-base';
import { Interface } from 'readline';

interface IProps {}
interface IState {
  MoneyToPay: number;
  MoneyToGet: number;
  fontLoaded: boolean;
}
export default class DashboardScreen extends Component<IProps, IState> {
  state: IState = {
    MoneyToPay: 0,
    MoneyToGet: 0,
    fontLoaded: false
  };

  async componentDidMount() {
    console.log('#############');
    console.log(this.state);
    try {
      await Font.loadAsync({
        Roboto: require('./Fonts/Roboto.ttf'),
        Roboto_medium: require('./Fonts/Roboto_medium.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
    const data = await fetch('https://koreanjson.com/users');
    console.log(data);
  }

  render() {
    return this.state.fontLoaded ? (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Ionicons name="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>폰트 죽여버린다</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    ) : (
      <Text>''</Text>
    );
  }
}
