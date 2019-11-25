import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import {
  Header,
  DatePicker,
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
  Body
} from 'native-base';

import FriendList from '../components/FriendList';
import PicPicker from '../components/PicPicker';
export interface Props {}

export interface State {
  title: string;
  totalPay: string;
  chosenDate: Date;
  peopleCnt: number;
  isVisible: boolean;
}
//InfoToServer
//totalPay, peopleCnt, subject, date
export interface Props {
  navigation: any;
}

//prop이나 request를 통해서 해당 거래 정보 접근해야 하고,
//자신이 boss일 때, part일 때 달라져야 한다.    입금요청/입금확인요청
export default class SingleViewPart extends React.Component<Props, State> {
  state = {
    title: '',
    totalPay: '',
    chosenDate: new Date(),
    peopleCnt: 1,
    isVisible: false
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

  render() {
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
              <Input onChange={this.onChangeTitle} />
              <Text>{this.state.title}</Text>
            </Item>

            <Text>
              결제생성일 : {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <Item fixedLabel>
              <Label>총 결제 금액</Label>
              <Text>{this.state.totalPay} 원</Text>
            </Item>
            <Item fixedLabel>
              <Label>참여자 선택하기</Label>
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}
              >
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <View style={this.styles.modal}>
                  <Text style={this.styles.text}>Modal is open!</Text>
                  <FriendList />
                  <Button
                    onPress={() => {
                      this.setState({ isVisible: !this.state.isVisible });
                    }}
                  >
                    <Text>확인</Text>
                  </Button>
                </View>
              </Modal>
              {/*Button will change state to true and view will re-render*/}
              <Button
                onPress={() => {
                  this.setState({ isVisible: true });
                }}
              >
                <Text>해당결제참여자 목록</Text>
              </Button>
              <Label>총 {this.state.peopleCnt} 명</Label>
            </Item>
            <Item fixedLabel>
              <Label>1인당 금액</Label>
              <Text>
                {parseInt(this.state.totalPay) / this.state.peopleCnt} 원
              </Text>
            </Item>
          </Form>

          <PicPicker />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                console.log('돌아가기');
              }}
            >
              <Text>돌아가기</Text>
            </Button>
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
