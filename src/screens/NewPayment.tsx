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
import CustomDatePicker from '../components/CustomDatePicker';
export interface Props {}

export interface State {
  title: string;
  totalPay: string;
  chosenDate: Date;
  peopleCnt: number;
  isVisible: boolean;
  disabled: boolean;
  modifyButtonText: string;
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
    isVisible: false,
    disabled: false,
    modifyButtonText: '등록'
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
  toModifyMode = () => {
    console.log('toggle');
    if (this.state.disabled) {
      alert('수정을 시작합니다.\n완료 후 저장을 꼭 눌러주세요!');
    } else {
      if (this.state.modifyButtonText === '등록') {
        alert('새 결제를 등록하였습니다.');
      } else {
        alert('변경사항을 저장하였습니다.');
      }
    }
    this.setState({
      ...this.state,
      disabled: !this.state.disabled,
      modifyButtonText:
        this.state.modifyButtonText === '수정' ? '변경사항저장' : '수정'
    });
  };
  render() {
    let { disabled } = this.state;
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
          <Text>새 결제 생성</Text>
          <Form style={{ width: 300 }}>
            <Item fixedLabel>
              <Label>제목</Label>
              <Input onChange={this.onChangeTitle} disabled={disabled} />
              <Text>{this.state.title}</Text>
            </Item>
            <CustomDatePicker
              disabled={disabled}
              setDate={this.setDate.bind(this)}
            />
            {/* <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text> */}
            <Item fixedLabel>
              <Label>총 결제 금액</Label>
              <Input
                onChange={this.onChangeTotalPay}
                keyboardType="numeric"
                disabled={disabled}
              />
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
                      this.setState({
                        ...this.state,
                        isVisible: !this.state.isVisible
                      });
                    }}
                  >
                    <Text>확인</Text>
                  </Button>
                </View>
              </Modal>
              {/*Button will change state to true and view will re-render*/}
              <Button
                disabled={disabled}
                onPress={() => {
                  this.setState({ ...this.state, isVisible: true });
                }}
              >
                <Text>결제 참여자 등록</Text>
              </Button>
              <Label>총 {this.state.peopleCnt} 명</Label>
            </Item>
            <Item fixedLabel>
              <Label>1인당 금액</Label>
              <Input placeholder={this.calcN()} disabled={disabled} />
            </Item>
          </Form>

          <PicPicker disabled={disabled} />
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
            <Button onPress={this.toModifyMode}>
              <Text>{this.state.modifyButtonText}</Text>
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
