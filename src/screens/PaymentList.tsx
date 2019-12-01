import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerHeader } from '../components';
import { screenStyles } from '../screenStyles';
import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Icon,
  List,
  ListItem,
  Label
} from 'native-base';
import config from '../../config';
import firebase from 'firebase';
export interface Props {
  navigation: any;
}
export interface State {
  email: string;
  paymentList: Object[];
  refreshing: boolean;
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class PaymentList extends React.Component<Props, State> {
  state = {
    email: '',
    paymentList: [],
    refreshing: false
  };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  pressEvent = (isBoss, pricebookId, transCompleted) => {
    console.log(this, 'click!');
    if (isBoss) {
      console.log('go boss!');
      this.props.navigation.navigate('NewPayment', {
        fromListView: true,
        email: this.state.email,
        pricebookId: pricebookId,
        transCompleted: transCompleted
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
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
    });
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
    // console.log('response', response);
    let responseJson = await response.json();
    // console.log('responseJson', responseJson);

    this.setState({ email: user.email, paymentList: responseJson });
  }
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getOwnPayments();
    this.setState({ refreshing: false });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={this.styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
          <Container style={screenStyles.container}>
            <DrawerHeader
              title="결제목록 리스트"
              toggleDrawer={this.toggleDrawer}
            />

            <Content>
              <Text>보라색:수금필요 노란색:입금필요</Text>
              <List>
                {this.state.paymentList.map((payment, i) => {
                  return (
                    //결제 종류별로 색 구분할거임. 그리고 key나 기타로 바로 개별view들어갈 때 해당 키 날릴거.
                    <ListItem
                      style={
                        payment.transCompleted
                          ? this.styles.completed
                          : payment.boss
                          ? this.styles.bossItem
                          : this.styles.partItem
                      }
                      key={i}
                    >
                      <Left style={screenStyles.justifyC}>
                        <Label
                          style={
                            (screenStyles.inputLabel, screenStyles.blacktext)
                          }
                        >
                          {payment.title + '  '}
                        </Label>
                        <Text style={screenStyles.inputTxt}>
                          {payment.transCompleted
                            ? '완료된 거래'
                            : `총 ${payment.price} 원`}
                          {`\n ${payment.partyDate}`}
                        </Text>
                      </Left>
                      <Right>
                        <Text>{payment.transCompleted}</Text>
                        <Button
                          rounded
                          primary
                          //danger
                          style={this.styles.button}
                          onPress={() => {
                            this.pressEvent(
                              payment.boss,
                              payment.pricebookId,
                              payment.transCompleted
                            );
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
          </Container>
        </LinearGradient>
      </ScrollView>
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
    partItem: { backgroundColor: '#fbc531' },
    completed: { backgroundColor: '#dbdbdb' },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink'
    }
  });
}
