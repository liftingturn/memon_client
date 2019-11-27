import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
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
  Grid,
  Col,
  Row
} from 'native-base';

import {
  PicPicker,
  CustomDatePicker,
  InputItem,
  FriendListModal
} from '../components';
import config from '../../config';

export interface Props {
  navigation: any;
  fromListView: boolean;
}

export default class NewPayment extends React.Component<Props> {
  state = {
    friendList: [],
    chosenList: [],
    chosenNums: [],
    title: '',
    totalPay: '',
    chosenDate: new Date(),
    peopleCnt: 1,
    printModal: false,
    disabled: this.props.fromListView === null ? false : true,
    modifyButtonText: this.props.fromListView === null ? '등록' : '수정',
    chosenParty: [],
    email: '',
    pricebookId: ''
  };

  //get user filtered contact list
  componentDidMount = async () => {
    console.log('fromListView', this.props.fromListView);

    //스크린 모드 식별
    const { navigation } = this.props;
    console.log('this.props.navigation', navigation.state.params);

    if (navigation.state.params === undefined) {
      console.log('새 글 등록');
    } else {
      console.log('=========글 보기 페이지');
      const { fromListView, email, pricebookId } = navigation.state.params;
      if (fromListView) {
        await this.setState({
          ...this.state,
          disabled: true,
          email: email,
          pricebookId: pricebookId
        });
        await this.doFetch();
      }
    }

    //친구 목록 로딩
    const userCheckAPI = config.serverAddress + '/users/contacts';
    // ask permission to get contact
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    // get device contact list
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS]
      });

      if (data.length > 0) {
        let newList = [];
        for (let i = 1; i < data.length; i++) {
          if (data[i].phoneNumbers) {
            let contact = {
              name: data[i].name,
              phone: data[i].phoneNumbers[0].number.replace(/\D/g, ''),
              clicked: this.state.chosenNums.includes(
                data[i].phoneNumbers[0].number
              )
                ? true
                : false
            };
            newList.push(contact);
          }
        }
        const fetchRes = await fetch(userCheckAPI, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          /////////////test mode/////////////
          body: JSON.stringify([{ name: '최방실', phone: '01041554686' }])
          // JSON.stringify(newList)
        });
        const userFilterdList = await fetchRes.json();
        userFilterdList.forEach(user => {
          user.clicked = this.state.chosenNums.includes(user.phone)
            ? true
            : false;
        });
        await this.setState({ friendList: userFilterdList });
        console.log('userFilterdList', this.state.friendList);
      }
    }
  };

  //form handler functions
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
      const smallest = 100;
      const MoneyForOne =
        parseInt(this.state.totalPay) / (this.state.peopleCnt + 1);
      const change = Math.floor(MoneyForOne / smallest) * smallest;
      return JSON.stringify(change);
    }
  };

  handleChosenParty = chosen => {
    this.setState({
      ...this.state,
      chosenParty: chosen,
      peopleCnt: chosen.length
    });
  };

  //handle mode change
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

  //modal switch
  modalSwitch = () => {
    this.setState({
      ...this.state,
      printModal: !this.state.printModal
    });
  };

  //handle cancle modifying
  handleCancle = () => {
    //복사해 둔 최초 스테이트 값으로 셋스테이트 (리랜더링)
    //버튼 '수정'
  };

  doFetch = async () => {
    let emailObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boss: this.props.navigation.state.params.fromListView,
        email: this.props.navigation.state.params.email,
        pricebookId: this.props.navigation.state.params.pricebookId
      })
    };
    let response = await fetch(config.serverAddress + '/pricebook', emailObj);

    let responseJson = await response.json();
    console.log(
      responseJson.pricebook.title,
      responseJson.pricebook.partyDate,
      responseJson.pricebook.totalPrice
    );
    await this.setState({
      ...this.state,
      title: responseJson.pricebook.title,
      totalPay: responseJson.pricebook.totalPrice,
      peopleCnt: responseJson.pricebook.count,
      chosenDate: responseJson.pricebook.partyDate
    });
  };

  render() {
    console.log('disabled', this.state.disabled);
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
            <Text style={{ alignSelf: 'auto' }}>해당 결제 정보</Text>
          </Body>
        </Header>

        <Grid style={{ alignItems: 'center' }}>
          <Row size={3}>
            <Content
              contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
            >
              <View style={{ alignItems: 'center' }}>
                <Form style={{ width: 300 }}>
                  <InputItem
                    label={'제목'}
                    disabled={disabled}
                    onChange={this.onChangeTitle}
                  />

                  <Item fixedLabel>
                    <Label>날짜</Label>
                    <Text>
                      Date: {this.state.chosenDate.toString().substr(0, 10)}
                    </Text>
                    <CustomDatePicker
                      disabled={disabled}
                      setDate={this.setDate.bind(this)}
                    />
                  </Item>

                  <InputItem
                    label={'총 금액 : ' + this.state.totalPay}
                    disabled={disabled}
                    onChange={this.onChangeTotalPay}
                    keyT="numeric"
                  />
                  <Item fixedLabel>
                    <Label>참여한 사람</Label>
                    <FriendListModal
                      printModal={this.state.printModal}
                      modalSwitch={this.modalSwitch}
                      handleChosen={this.handleChosenParty}
                      chosen={this.state.chosenParty}
                    />
                    <Label> 총 {this.state.peopleCnt} 명</Label>
                    <Right>
                      <Button
                        light
                        disabled={disabled}
                        onPress={this.modalSwitch}
                      >
                        <Text>선택하기</Text>
                      </Button>
                    </Right>
                  </Item>
                  <Item fixedLabel>
                    <Label>1인당 금액</Label>
                    <Input placeholder={`${this.calcN()} 원`} disabled={true} />
                  </Item>
                </Form>
              </View>
            </Content>
          </Row>
          <Row size={2}>
            <Content>
              <View style={{ justifyContent: 'flex-start' }}>
                <PicPicker disabled={disabled} />
              </View>
            </Content>
          </Row>
        </Grid>

        <Footer>
          <FooterTab style={{ backgroundColor: '#FFF' }}>
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
      // alignItems: 'center'
      // justifyContent: 'center'
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      // alignItems: 'center',
      padding: 50
    },
    text: {
      color: '#3f2949',
      marginTop: 10
    }
  });
}
