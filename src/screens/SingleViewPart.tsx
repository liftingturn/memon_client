import React from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerHeader } from '../components';
import {
  Header,
  Form,
  Label,
  Input,
  Item,
  Container,
  Left,
  Right,
  Footer,
  FooterTab,
  Button,
  Content,
  Icon,
  Body,
  List
} from 'native-base';

import PicPicker from '../components/PicPicker';
import config from '../../config';
export interface Props {}

export interface State {
  title: string;
  totalPay: string;
  chosenDate: Date;
  peopleCnt: number;
  isVisible: boolean;
  image: any;
}
//InfoToServer
//totalPay, peopleCnt, subject, date
export interface Props {
  navigation: any;
  boss: boolean;
  email: string;
  pricebookId: string;
}

//prop이나 request를 통해서 해당 거래 정보 접근해야 하고,
//자신이 boss일 때, part일 때 달라져야 한다.    입금요청/입금확인요청
export default class SingleViewPart extends React.Component<Props, State> {
  state = {
    title: '',
    totalPay: '',
    chosenDate: new Date(),
    peopleCnt: 1,
    isVisible: false,
    image: null
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
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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
      totalPay: responseJson.pricebook.totalPrice,
      peopleCnt: responseJson.pricebook.count,
      chosenDate: responseJson.pricebook.partyDate
    });
  }
  render() {
    let fromList = !this.props.boss;
    let { image } = this.state;
    return (
      <Container style={this.styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.toggleDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>해당 결제 정보</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Participant view</Text>
          <Form style={{ width: 300 }}>
            <Item fixedLabel>
              <Label>제목</Label>
              <Input onChange={this.onChangeTitle} disabled={fromList} />
            </Item>
            <Item fixedLabel>
              <Label>결제생성일</Label>
              <Text>
                결제생성일 : {this.state.chosenDate.toString().substring(0, 10)}
              </Text>
            </Item>

            <Item fixedLabel>
              <Label>총 결제 금액</Label>
              <Text>{this.state.totalPay} 원</Text>
            </Item>
            <Item fixedLabel>
              <Label>참여자 목록</Label>
              <List></List>
              <Label>총 {this.state.peopleCnt} 명</Label>
            </Item>
            <Item fixedLabel>
              <Label>1인당 금액</Label>
              <Text>
                {parseInt(this.state.totalPay) / this.state.peopleCnt} 원
              </Text>
            </Item>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>
          </Form>

          <PicPicker disabled={fromList} />
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Text>결제 확인 요청</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  styles = StyleSheet.create({
    container: {
      marginTop: 24,
      flex: 1,
      backgroundColor: '#fff'
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    modal: {
      flex: 1,
      // alignItems: 'center',
      backgroundColor: '#00ff00',
      padding: 50
    },
    text: {
      color: '#3f2949',
      marginTop: 10
    }
  });
}
