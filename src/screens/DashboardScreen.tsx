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
import { screenStyles, styles_Toast, styles_Dashboard } from '../screenStyles';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Toast,
  Root,
  Button
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
    this.props.navigation.navigate('새거래');
  };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
    const fetchAdd = config.serverAddress + '/main';

    try {
      const user = await firebase.auth().currentUser;
      console.log('대시보드 조회할 이메일:', user.email);
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
      console.log('fetch실패');
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
          <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
            <Container style={screenStyles.container}>
              <DrawerHeader title="MEMON" toggleDrawer={this.toggleDrawer} />
              <Card
                style={{
                  marginTop: 50,
                  borderRadius: 15,
                  width: this.deviceWidth * 0.75,
                  marginLeft: this.deviceWidth * 0.125
                }}
              >
                <CardItem style={styles_Dashboard.userCardItem}>
                  <Thumbnail
                    square
                    source={{ uri: this.state.avatar }}
                    style={styles_Dashboard.thumnail}
                  />
                  <Body>
                    <Text style={styles_Dashboard.userName}>
                      {this.state.name}님
                    </Text>
                  </Body>
                </CardItem>
                <CardItem
                  style={{
                    paddingTop: 0,
                    paddingBottom: 10,
                    borderRadius: 15,
                    marginLeft: 10
                  }}
                >
                  <Body>
                    <Text style={styles_Dashboard.greetingBody}>
                      오늘 하루도
                    </Text>
                    <Text style={styles_Dashboard.greetingBody}>
                      보람찬 수금을 응원합니다!
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Content
                style={{ backgroundColor: 'transparent' }}
                scrollEnabled={false}
              >
                <NetCard
                  header={'정산이 끝나지 않았어요!'}
                  get={this.state.moneyToGet}
                  pay={this.state.moneyToPay}
                />
                <ButtonBasic
                  type="txt"
                  label="+"
                  onPress={this.moveToNewPayment}
                />
              </Content>
            </Container>
          </LinearGradient>
        </ScrollView>
      </Root>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
