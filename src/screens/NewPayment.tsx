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
  // 주소록에서 목록을 가져와서 [이름/번호]
  // 서버로 전송하면 번호 기반으로 가입자만 가려서 리턴 req[이름/전화번호] //res [이름/전화번호/userId]
  // 받은 리턴 목록 스크린에 출력(베이스 리스트 가능하면 페이지 전환없이? 모달이라든가..)
  // 참여자를 선택. 하고 완료(확인)하면 참여자수 자동 계산, 1/n금액 자동계산.
  // 결제 등록 시 , 서버로 해당 정보들 보냄(참여자는 user.id로 보냄.).

  //participant : [{username: 'hae',phone:'010',userId:'3'}, ...]
  //베어미니멈 - 10원 단위 절사하고 차액은 보스 부담
  //어드밴스드 1 : 보스의 추가 부담 내용 푸시 알림에 포함
  //어드밴스드 2 : 차액 부담자 유저가 선택
}
//InfoToServer
//totalPay, peopleCnt, subject, date
export interface Props {
  navigation: any;
}
export default class NewPayment extends React.Component<Props, State> {
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
            <Text>Header</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>새 결제 생성</Text>
          <Form style={{ width: 300 }}>
            <Item fixedLabel>
              <Label>제목</Label>
              <Input onChange={this.onChangeTitle} />
              <Text>{this.state.title}</Text>
            </Item>

            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(2018, 1, 1)}
              // maximumDate={new Date()}
              locale="ko"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType="fade"
              androidMode="default"
              placeHolderText="날짜를 선택해주세요."
              textStyle={{ color: 'green' }}
              placeHolderTextStyle={{ color: '#d3d3d3' }}
              onDateChange={this.setDate.bind(this)}
              disabled={false}
            />
            {/* <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text> */}
            <Item fixedLabel>
              <Label>총 결제 금액</Label>
              <Input onChange={this.onChangeTotalPay} keyboardType="numeric" />
            </Item>
            <Item fixedLabel>
              <Label>참여자 선택하기</Label>
              <Input />
              <Label>{this.state.peopleCnt} 명</Label>
            </Item>
            <Item fixedLabel>
              <Label>1인당 금액</Label>
              <Input placeholder={this.calcN()} disabled />
            </Item>
          </Form>
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
            <Text>Click To Open Modal</Text>
          </Button>
          <PicPicker />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                console.log('결제등록');
              }}
            >
              <Text>결제 등록</Text>
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
