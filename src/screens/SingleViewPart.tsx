import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  screenStyles,
  styles_newPayment,
  styles_SingleView
} from '../screenStyles';
import firebase from 'firebase';
import config from '../../config';

import {
  Form,
  Label,
  Item,
  Container,
  Footer,
  FooterTab,
  Button,
  Content,
  Spinner,
  Image
} from 'native-base';

import { DrawerHeader } from '../components';

export interface State {
  pushing: boolean;
  title: string;
  totalPay: string;
  chosenDate: Date;
  peopleCnt: number;
  isVisible: boolean;
  billImgSrc: any;
  pricebookId: string;
  refreshing: boolean;
}
//InfoToServer
//totalPay, peopleCnt, subject, date
export interface Props {
  navigation: any;
  boss: boolean;
  email: string;
  pricebookId: string;
  isPayed: boolean;
}

//prop이나 request를 통해서 해당 거래 정보 접근해야 하고,
//자신이 boss일 때, part일 때 달라져야 한다.    입금요청/입금확인요청
export default class SingleViewPart extends React.Component<Props, State> {
  state = {
    pushing: false,
    title: '',
    totalPay: '',
    chosenDate: new Date(),
    peopleCnt: 1,
    isVisible: false,
    billImgSrc: null,
    pricebookId: '',
    refreshing: false
  };
  static navigationOptions = {
    activeTintColor: '#e91e63'
  };
  setDate(newDate: Date): any {
    this.setState({ ...this.state, chosenDate: newDate });
  }
  onChangeTotalPay = e => {
    console.log('onchange do', e.nativeEvent.text);
    this.setState({ ...this.state, totalPay: e.nativeEvent.text });
  };

  onChangeTitle = e => {
    this.setState({ ...this.state, title: e.nativeEvent.text });
  };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  calcN = () => {
    console.log('state pay', this.state.totalPay);
    if (!this.state.totalPay) {
      return 'total 금액 입력해주세요!';
    } else {
      return String(parseInt(this.state.totalPay) / this.state.peopleCnt);
    }
  };

  // handleBackPress = () => {};
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('거래목록');
    });

    let emailObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boss: this.props.navigation.state.params.boss,
        email: this.props.navigation.state.params.email,
        pricebookId: this.props.navigation.state.params.pricebookId
      })
    };
    let response = await fetch(config.serverAddress + '/pricebook', emailObj);

    let responseJson = await response.json();
    console.log(responseJson);
    this.setState({
      ...this.state,
      title: responseJson.pricebook.title,
      totalPay: responseJson.pricebook.fixedTotalPrice,
      peopleCnt: responseJson.pricebook.count,
      chosenDate: responseJson.pricebook.partyDate,
      pricebookId: responseJson.pricebook.id
    });
  }
  pushRequest = async () => {
    console.log('i want to push');
    if (this.props.navigation.state.params.isPayed) {
      this.props.navigation.navigate('거래목록');
    } else {
      this.setState({ ...this.state, pushing: true });
      const user = await firebase.auth().currentUser;
      let emailObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          title: user.displayName,
          pricebookId: this.state.pricebookId,
          msg: ` [${this.state.title}] 모임에 대한 입금 확인을 요청하였습니다.`,
          target: 'boss'
        })
      };
      let response = await fetch(
        config.serverAddress + '/users/pushtoken',
        emailObj
      );
      console.log('response.status', response);
      if (response.status === 200) {
        alert('입금 확인 요청을 보냈어요');
        this.setState({ ...this.state, pushing: false });
      } else if (response.status === 400) {
        alert('입금 확인 요청을 보내지 못했어요');
        this.setState({ ...this.state, pushing: false });
      }
      // let responseJson = await response.json();
      // console.log(responseJson);
    }
  };
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.componentDidMount();
    this.setState({ refreshing: false });
  };
  // tslint:disable-next-line: max-func-body-length
  render() {
    if (this.props.navigation.state.params === undefined) {
      alert('해당 페이지는 참여거래정보를 통한 접근만 사용합니다.');
      this.props.navigation.navigate('홈');
      return <ScrollView></ScrollView>;
    } else {
      console.log('싱글뷰페이지 프롭스 봅시다', this.props);
      let fromList = !this.props.boss;
      let { billImgSrc } = this.state;
      const title = this.props.navigation.state.params.isPayed
        ? '지불 완료'
        : '줄 돈';
      const priceforOne = (parseInt(this.state.totalPay) / this.state.peopleCnt)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return (
        <ScrollView
          contentContainerStyle={screenStyles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
            <Container style={screenStyles.container}>
              <DrawerHeader title={title} toggleDrawer={this.toggleDrawer} />
              <Content
                contentContainerStyle={styles_SingleView.contentContainer}
              >
                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                  <Form style={styles_newPayment.form}>
                    <Item
                      fixedLabel
                      style={{ ...styles_SingleView.item, paddingTop: 5 }}
                    >
                      <Label style={screenStyles.inputItemLabel}>제목</Label>
                      <Text style={screenStyles.inputTxt}>
                        {this.state.title}
                      </Text>
                    </Item>
                    <Item fixedLabel style={styles_SingleView.item}>
                      <Label style={screenStyles.inputItemLabel}>모임일</Label>
                      <Text style={screenStyles.inputTxt}>
                        {this.state.chosenDate.toString().substring(0, 10)}
                      </Text>
                    </Item>
                    <Item fixedLabel style={styles_SingleView.item}>
                      <Label style={screenStyles.inputItemLabel}>총 금액</Label>
                      <Text style={screenStyles.inputTxt}>
                        {this.state.totalPay
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        원
                      </Text>
                    </Item>
                    <Item fixedLabel style={styles_SingleView.item}>
                      <Label style={screenStyles.inputItemLabel}>
                        참여자 수
                      </Label>
                      <Text style={screenStyles.inputTxt}>
                        총 {this.state.peopleCnt} 명
                      </Text>
                    </Item>
                    <Item
                      fixedLabel
                      style={{
                        ...styles_SingleView.item,
                        borderBottomColor: 'transparent'
                      }}
                    >
                      <Label style={screenStyles.inputItemLabel}>
                        1인당 금액
                      </Label>
                      <Text style={screenStyles.inputTxt}>
                        {priceforOne} 원
                      </Text>
                    </Item>
                  </Form>
                </View>
              </Content>
              <Footer>
                <FooterTab style={{ backgroundColor: '#FFF' }}>
                  <Button onPress={this.pushRequest}>
                    {title === '지불 완료' ? (
                      <Text style={{ fontFamily: 'NotoSans_normal' }}>
                        확인
                      </Text>
                    ) : this.state.pushing === false ? (
                      <Text style={{ fontFamily: 'NotoSans_normal' }}>
                        입금 확인 요청하기
                      </Text>
                    ) : (
                      <Spinner color="yellow" />
                    )}
                  </Button>
                </FooterTab>
              </Footer>
            </Container>
          </LinearGradient>
        </ScrollView>
      );
    }
  }
}
