import React, { Component } from 'react';
import {
  BackHandler,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NetCard, DrawerHeader, ButtonBasic } from '../components';
import config from './../../config';
import firebase from 'firebase';
import { screenStyles, styles_Toast } from '../screenStyles';

import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Toast,
  Root
} from 'native-base';

interface Props {
  navigation: any;
}
interface State {
  moneyToPay: string;
  moneyToGet: string;
  uri: string;
  refreshing: boolean;
  name: string;
  avatar: string;
  goBack: number;
  showToast: boolean;
}
export default class DashboardScreen extends Component<Props, State> {
  state: State = {
    moneyToPay: '',
    moneyToGet: '',
    uri: '',
    refreshing: false,
    name: '',
    avatar: 'https://via.placeholder.com/150',
    goBack: 0,
    showToast: false
  };
  deviceWidth = Dimensions.get('window').width;
  moveToNewPayment = () => {
    this.props.navigation.navigate('NewPayment');
  };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
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
        ...this.state,
        moneyToPay: parsedMoneyData.moneyToPay,
        moneyToGet: parsedMoneyData.moneyToGet,
        avatar: parsedMoneyData.avatar,
        name: user.displayName
      });
    } catch (error) {
      console.error(error);
    }
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.componentDidMount();
    this.setState({ refreshing: false });
  };

  goBack = async () => {
    await this.setState({ ...this.state, goBack: this.state.goBack + 1 });
    if (this.state.goBack === 1) {
      Toast.show({
        text: '한 번 더 누르면 앱을 종료합니다',
        style: styles_Toast.container,
        textStyle: styles_Toast.txt,
        duration: 3000
      });
    } else if (this.state.goBack > 1) {
      this.setState({ ...this.state, goBack: 0 });
      BackHandler.exitApp();
    }
  };
  render() {
    console.log('================enter dashboard');
    return (
      <Root>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <LinearGradient style={{ flex: 1 }} colors={['#e2b3ff', '#937ee0']}>
            <Container style={screenStyles.container}>
              <DrawerHeader title="Memon" toggleDrawer={this.toggleDrawer} />
              <Card
                style={{
                  width: this.deviceWidth * 0.8,
                  marginLeft: this.deviceWidth * 0.1
                }}
              >
                <CardItem>
                  <Thumbnail source={{ uri: this.state.avatar }} />
                  <Body>
                    <Text style={{ marginLeft: 20 }}>
                      {this.state.name}님,{'\n'}안녕하세요.{'\n'}오늘도 슬기로운
                      수금생활 되세요!
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Content
                style={{ backgroundColor: 'transparent' }}
                scrollEnabled={false}
              >
                <NetCard
                  header={'현재 미완료 금액 총계'}
                  get={this.state.moneyToGet}
                  pay={this.state.moneyToPay}
                />
              </Content>
              <ButtonBasic
                type="txt"
                label="+"
                onPress={this.moveToNewPayment}
              />
            </Container>
          </LinearGradient>
        </ScrollView>
      </Root>
    );
  }

  styles = StyleSheet.create({
    container: {
      // marginTop: 23,
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
