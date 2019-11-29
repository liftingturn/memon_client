import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { screenStyles, styles_newPayment } from '../screenStyles';
import firebase from 'firebase';
import { Person, Payment } from '../types';
import {
  Form,
  Label,
  Item,
  Container,
  Right,
  Button,
  Content,
  Icon
} from 'native-base';

import {
  PicPicker,
  CustomDatePicker,
  InputItem,
  FriendListModal,
  DrawerHeader,
  NewPayFooter,
  ChosenFriendListItem,
  SplitPayment
} from '../components';
import config from '../../config';

export interface Props {
  navigation: any;
  fromListView: boolean;
}

export interface State {
  friendList: Person[];
  chosenNums: string[];
  chosenList: Person[];
  title: string;
  totalPay: number | string;
  singlePay?: number | string;
  chosenDate: Date | string;
  peopleCnt: number;
  printModal: boolean;
  disabled: boolean;
  modifyButtonText: string;
  email: string;
  pricebookId: string;
}

export default class NewPayment extends React.Component<Props> {
  state = {
    friendList: [],
    chosenNums: [],
    chosenList: [],
    title: '',
    totalPay: '',
    singlePay: '',
    chosenDate: new Date(),
    peopleCnt: 0,
    printModal: false,
    disabled: this.props.fromListView ? false : true,
    modifyButtonText: this.props.fromListView ? '등록' : '수정',
    email: '',
    pricebookId: '',
    billImgSrc: ''
  };

  //get user filtered contact list
  componentDidMount = async () => {
    console.log('fromListView', this.props.fromListView);

    //스크린 모드 식별
    const { navigation } = this.props;
    // console.log('this.props.navigation', navigation.state.params);

    if (!navigation.state.params) {
      console.log('새 글 등록');
    } else {
      console.log('=========글 보기 페이지');
      const { fromListView, email, pricebookId } = navigation.state.params;
      //**************************//
      //서버에서 개별결제 페이지 리스폰스 보낼때 참여자 전화번호 같이 보내줘야함
      //참여자 전화번호 추출해서 state.chosenNums=[ 'phone', 'phone', 'phone' ]
      // ---------> 비활성화 클릭하면, 등록된 결제건은 참여자 수정이 불가능합니다.
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
            let contact: Person = {
              name: data[i].name,
              phone: data[i].phoneNumbers[0].number.replace(/\D/g, ''),
              clicked: false
            };
            newList.push(contact);
          }
        }
        // request server for checking app user
        const fetchRes = await fetch(userCheckAPI, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newList)
        });
        const userFilterdList = await fetchRes.json();
        userFilterdList.forEach(user => {
          user.isIn = true;
          user.clicked = this.state.chosenNums.includes(user.phone)
            ? true
            : false;
        });
        await this.setState({ ...this.state, friendList: userFilterdList });
        console.log('userFilterdList', this.state.friendList);
      }
    }
  };

  //form handler functions
  setDate = async newDate => {
    await this.setState({ ...this.state, chosenDate: newDate });
  };

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

  handlePicPicker = async uri => {
    this.setState({ ...this.state, billImgSrc: uri });
  };

  remainder = '';
  calcN = () => {
    console.log('state pay', this.state.totalPay);
    if (!this.state.totalPay) {
      return '1/N';
    } else {
      const smallest = 100;
      const MoneyForOne =
        parseInt(this.state.totalPay) / (this.state.peopleCnt + 1);
      let change: any = Math.floor(MoneyForOne / smallest) * smallest;
      this.remainder = String(Math.round(MoneyForOne - change));
      this.setState({ ...this.state, singlePay: change });

      //print format
      const strChange = String(change);
      let formatStr = '';
      if (strChange.length > 3) {
        let maxComma =
          strChange.length % 3 === 0
            ? Math.floor(strChange.length / 3) - 1
            : Math.floor(strChange.length / 3);
        let last = strChange.length + 1;
        for (let i = maxComma; i > 0; i--) {
          formatStr = strChange.substring(last - 4, last) + ',' + formatStr;
          last = last - 4;
          console.log(formatStr);
        }
        formatStr =
          strChange.substring(0, last) +
          ',' +
          formatStr.substring(0, formatStr.length - 1);
      }
      return `${formatStr} 원`;
    }
  };

  //handle modify
  toModifyMode = () => {
    console.log('toggle');
    if (this.state.disabled) {
      alert('수정을 시작합니다.\n완료 후 저장을 꼭 눌러주세요!');
    } else {
      if (this.state.modifyButtonText === '등록') {
        this.handleSubmit();
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

  //modal contacts switch
  modalSwitch = () => {
    this.setState({
      ...this.state,
      printModal: !this.state.printModal
    });
  };

  //handle select party
  handleSelectParty = async phone => {
    //newList = [...friendList] loop to find person, clicked = ! clicked
    //setState {...this.state, friendList:newList}
    let cnt = 0;
    console.log('handleSelectParty');
    console.log('phone', phone);
    const newList = [...this.state.friendList];
    newList.forEach(person => {
      if (person.phone === phone) {
        person.clicked = !person.clicked;
      }
    });
    const chosen = [];
    const chosenL = [];
    newList.forEach(person => {
      if (person.clicked) {
        chosen.push(person.phone);
        chosenL.push(person);
        cnt++;
      }
    });
    await this.setState({
      ...this.state,
      friendList: newList,
      peopleCnt: cnt,
      chosenNums: chosen,
      chosenList: chosenL
    });
    console.log('friendList', this.state.friendList);
    console.log('chosenNums', this.state.chosenNums);
  };

  //handle cancle modifying
  handleCancle = () => {
    //복사해 둔 최초 스테이트 값으로 셋스테이트 (리랜더링)
    //버튼 '수정'
    //서버 안보냄.
    this.props.navigation.goBack();
  };

  handleSubmit = async () => {
    const newPaymentAPI = config.serverAddress + '/payment';
    const user = await firebase.auth().currentUser;
    const partyDate =
      this.state.chosenDate.getFullYear() +
      '-' +
      this.state.chosenDate.getMonth() +
      '-' +
      this.state.chosenDate.getDate();

    let payment: Payment = {
      priceBook: {
        totalPrice: Number(this.state.totalPay),
        billImgSrc: this.state.billImgSrc,
        count: this.state.peopleCnt,
        partyDate,
        title: this.state.title,
        transCompleted: false,
        fixedTotalPrice: Number(this.state.singlePay)
      },
      email: user.email,
      participant: this.state.chosenList
    };
    console.log('sumitted!', payment);

    const fetchRes = await fetch(newPaymentAPI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payment)
    });
    const priceBook = await fetchRes.json();
    console.log('sumitted!', priceBook);
    this.props.navigation.navigate('PaymentList');
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
      chosenDate: responseJson.pricebook.partyDate,
      billImgSrc: responseJson.pricebook.billImgSrc
    });
    console.log('afterFetch', this.state);
  };

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
    console.log('===props', this.props);
  }

  render() {
    console.log('disabled', this.state.disabled);
    let { disabled } = this.state;
    return (
      <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
        <Container style={screenStyles.container}>
          <DrawerHeader
            title="새결제 등록하기"
            toggleDrawer={this.toggleDrawer}
          />
          <Content
            contentContainerStyle={{
              justifyContent: 'flex-start',
              paddingTop: 35
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Form style={styles_newPayment.form}>
                <InputItem
                  label="제목"
                  disabled={disabled}
                  onChange={this.onChangeTitle}
                  placeholder="어떤 모임이었나요?"
                  txt={this.state.title}
                />

                <Item fixedLabel>
                  <Label style={screenStyles.inputLabel}>날짜</Label>
                  <CustomDatePicker
                    disabled={disabled}
                    setDate={this.setDate}
                  />
                </Item>
                <InputItem
                  label="금액"
                  disabled={disabled}
                  onChange={this.onChangeTotalPay}
                  keyT="numeric"
                  placeholder="총 금액을 입력해주세요"
                  txt={this.state.totalPay}
                />
                <Item fixedLabel>
                  <Label style={screenStyles.inputLabel}>참여자</Label>
                  <FriendListModal
                    printModal={this.state.printModal}
                    modalSwitch={this.modalSwitch}
                    handleSelect={this.handleSelectParty}
                    friendList={this.state.friendList}
                  />
                  <Label style={{ paddingLeft: 15 }}>
                    {this.state.peopleCnt
                      ? `총 ${this.state.peopleCnt} 명`
                      : ''}
                  </Label>
                  <Right>
                    <Button
                      disabled={disabled}
                      onPress={this.modalSwitch}
                      style={screenStyles.iconBtn}
                    >
                      <Icon
                        name="search"
                        fontSize={40}
                        style={{ color: '#907be0' }}
                      />
                    </Button>
                  </Right>
                </Item>
                <View style={{ flexDirection: 'column', marginVertical: 10 }}>
                  <ChosenFriendListItem name="나" />
                  {this.state.chosenList.length
                    ? this.state.chosenList.map((person, i) => {
                        return (
                          <ChosenFriendListItem key={i} name={person.name} />
                        );
                      })
                    : null}
                </View>

                <SplitPayment
                  splitPayment={this.calcN()}
                  remainder={this.remainder}
                />
              </Form>
            </View>
            <PicPicker
              disabled={disabled}
              handlePicker={this.handlePicPicker}
              uri={this.state.billImgSrc}
            />
          </Content>
          <NewPayFooter
            label={this.state.modifyButtonText}
            onPress={this.toModifyMode}
            goBack={this.handleCancle}
          />
        </Container>
      </LinearGradient>
    );
  }
}
