import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerHeader } from '../components';
import { screenStyles } from '../screenStyles';
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
  Icon,
  List,
  ListItem
} from 'native-base';
import config from '../../config';
import firebase from 'firebase';
export interface Props {
  navigation: any;
}
export interface State {
  email: string;
  paymentList: Object[];
}

export default class PaymentList extends React.Component<Props, State> {
  state = {
    email: '',
    paymentList: []
  };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  pressEvent = (isBoss, pricebookId) => {
    console.log(this, 'click!');
    if (isBoss) {
      console.log('go boss!');
      this.props.navigation.navigate('NewPayment', {
        fromListView: true,
        email: this.state.email,
        pricebookId: pricebookId
      });
    } else {
      console.log('go pay');
      this.props.navigation.navigate('참여자개별결제페이지', {
        boss: false,
        email: this.state.email,
        pricebookId: pricebookId
      });
    }
  };
  componentDidMount() {
    this.getOwnPayments();
  }

  async getOwnPayments() {
    const user = await firebase.auth().currentUser;
    console.log('==============user:', user.email);
    let emailObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email
      })
    };
    let response = await fetch(config.serverAddress + '/payment/all', emailObj);
    console.log('response', response);
    let responseJson = await response.json();
    this.setState({ email: user.email, paymentList: responseJson });
  }

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <Container style={screenStyles.container}>
          <DrawerHeader
            title="결제목록 리스트"
            toggleDrawer={this.toggleDrawer}
          />

          <Content>
            <Text>보라색:수금필요 노란색:입금필요</Text>
            <List>
              {this.state.paymentList.map(payment => {
                return (
                  //결제 종류별로 색 구분할거임. 그리고 key나 기타로 바로 개별view들어갈 때 해당 키 날릴거.
                  <ListItem
                    style={
                      payment.boss ? this.styles.bossItem : this.styles.partItem
                    }
                    key={payment.pricebookId}
                  >
                    <Left>
                      <Text>{payment.title}</Text>
                      <Text>{payment.price}</Text>
                    </Left>
                    <Right>
                      <Button
                        rounded
                        primary
                        //danger
                        style={this.styles.button}
                        onPress={() => {
                          this.pressEvent(payment.boss, payment.pricebookId);
                        }}
                      >
                        <Icon name="arrow-forward" />
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          </Content>
          {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
        </Container>
      </LinearGradient>
    );
  }
  styles = StyleSheet.create({
    container: {
      marginTop: 24,
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      width: 100,
      justifyContent: 'center'
    },
    bossItem: { backgroundColor: '#9c88ff' },
    partItem: { backgroundColor: '#fbc531' }
  });
}
