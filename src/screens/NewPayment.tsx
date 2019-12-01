import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { screenStyles, styles_newPayment, styles_Toast } from '../screenStyles';
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
  Icon,
  Root,
  Toast
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
import PhoneInputScreen from './PhoneInputScreen';
import { timingSafeEqual } from 'crypto';

export interface Props {
  navigation: any;
  fromListView: boolean;
}

export interface State {
  pageTitle: string;
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
  uniqueDisable: boolean;
  showToast: boolean;
}

export default class NewPayment extends React.Component<Props> {
  state = {
    pageTitle: '새 결제 등록',
    friendList: [],
    chosenNums: [],
    chosenList: [],
    title: '',
    totalPay: '',
    singlePay: '',
    chosenDate: new Date(),
    peopleCnt: 0,
    printModal: false,
    disabled: false,
    // modifyButtonText: this.props.fromListView ? '수정' : '등록',
    modifyButtonText: '등록',
    email: '',
    pricebookId: '',
    billImgSrc: '',
    uniqueDisable: false,
    showToast: false
  };

  async componentWillReceiveProps() {
    console.log('=========리스트에서 온거야 비활성화 해야해');
    const {
      fromListView,
      email,
      pricebookId
    } = this.props.navigation.state.params;

    if (fromListView) {
      await this.setState({
        ...this.state,
        disabled: true,
        uniqueDisable: true,
        email: email,
        pricebookId: pricebookId,
        modifyButtonText: '수정',
        pageTitle: '단일 결제 정보'
      });
      await this.doFetch();
    }
  }
  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
    console.log('fromListView', this.props.fromListView);

    //스크린 모드 식별
    const { navigation } = this.props;
    // console.log('this.props.navigation', navigation.state.params);

    if (!navigation.state.params) {
      console.log('새 글 등록, state.disabled:', this.state.disabled);
    } else {
      console.log('=========리스트에서 온거야 비활성화 해야해');
      const { fromListView, email, pricebookId } = navigation.state.params;
      //**************************//
      //서버에서 개별결제 페이지 리스폰스 보낼때 참여자 전화번호 같이 보내줘야함
      //참여자 전화번호 추출해서 state.chosenNums=[ 'phone', 'phone', 'phone' ]
      // ---------> 비활성화 클릭하면, 등록된 결제건은 참여자 수정이 불가능합니다.
      if (fromListView) {
        await this.setState({
          ...this.state,
          disabled: true,
          uniqueDisable: true,
          email: email,
          pricebookId: pricebookId,
          modifyButtonText: '수정',
          pageTitle: '단일 결제 정보'
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
      console.log('=====newList====', newList[0]);

      if (navigation.state.params) {
        let newChosen = [...this.state.chosenList];
        newChosen.forEach(chosen => {
          newList.forEach(gotName => {
            if (chosen.phone === gotName.phone) {
              chosen.name = gotName.name;
            }
          });
        });
        await this.setState({ ...this.state, chosenList: newChosen });
        console.log('=====+Name chosenList====', this.state.chosenList);
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
        user.isPayed = user.isPayed ? user.isPayed : false;
      });
      await this.setState({ ...this.state, friendList: userFilterdList });
    }
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
    ///// 참여자 목록 추출 ///////
    console.log('페이먼트 추출해야함', responseJson.paymentObj);
    const chosenList = responseJson.paymentObj.map(record => {
      console.log('///////////맵!!!////////////', record);
      return {
        name: '',
        phone: record.phone,
        id: record.participantId, ////???????///
        transId: record.id,
        clicked: true,
        isPayed: record.isPayed
      };
    });
    await this.setState({
      ...this.state,
      title: responseJson.pricebook.title,
      totalPay: responseJson.pricebook.totalPrice,
      peopleCnt: responseJson.pricebook.count,
      chosenDate: responseJson.pricebook.partyDate,
      billImgSrc: responseJson.pricebook.billImgSrc,
      chosenList: chosenList
    });
    console.log('afterFetch', this.state.chosenList);
    return;
  };

  //backHandler
  goBack = () => {
    console.log(this.props.navigation);
    if (this.props.navigation.state.params) {
      console.log("goBack it's view");
      this.handleGoback('view');
    } else {
      console.log("goBack it's new");
      this.handleGoback('new');
    }
  };

  handleGoback = from => {
    if (from === 'view') {
      this.props.navigation.navigate('PaymentList');
    } else if (from === 'new') {
      this.props.navigation.navigate('Home');
    }
  };

  //drawer
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  //form handler functions
  setDate = async newDate => {
    await this.setState({ ...this.state, chosenDate: newDate });
  };

  onChangeTotalPay = e => {
    console.log('onchange do', e.nativeEvent.text);
    this.calcN();
    this.setState({ ...this.state, totalPay: e.nativeEvent.text });
  };

  onChangeTitle = e => {
    this.setState({ ...this.state, title: e.nativeEvent.text });
  };

  handlePicPicker = async uri => {
    this.setState({ ...this.state, billImgSrc: uri });
  };

  remainder = '';
  calcN = async () => {
    console.log('////////////// * calcN * //////////////');
    console.log('state pay', this.state.totalPay);
    if (!this.state.totalPay) {
      this.setState({ ...this.state, singlePay: 'placeholder' });
      console.log('placeholder');
    } else {
      console.log('calcN!!!');

      const smallest = 100;
      const MoneyForOne =
        parseInt(this.state.totalPay) / (this.state.peopleCnt + 1);
      let change: any = Math.floor(MoneyForOne / smallest) * smallest;
      this.remainder = String(Math.round(MoneyForOne - change));
      // this.setState({ ...this.state, singlePay: change });

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
        }
        formatStr =
          '₩' +
          strChange.substring(0, last) +
          ',' +
          formatStr.substring(0, formatStr.length - 1);
        console.log('formatStr', formatStr);
      }
      await this.setState({ ...this.state, singlePay: formatStr });
      console.log('singlePay', this.state.singlePay);
    }
  };

  //modal to select party
  modalSwitch = () => {
    this.setState({
      ...this.state,
      printModal: !this.state.printModal
    });
  };

  handleSelectParty = async phone => {
    //newList = [...friendList] loop to find person, clicked = ! clicked
    //setState {...this.state, friendList:newList}
    let cnt = 0;
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
    this.calcN();
    console.log('friendList', this.state.friendList);
    console.log('chosenNums', this.state.chosenNums);
  };

  changePayedTrans = phone => {
    let chosen = [...this.state.chosenList];
    chosen.forEach(person => {
      if (person.phone === phone) {
        person.askConfirm = person.askConfirm ? false : true;
      }
    });
    this.setState({ ...this.state, chosenList: chosen });
  };

  //handle modify & submit
  toModifyMode = async () => {
    console.log('=====수정모드변경===');
    console.log(`====현재 수정 버튼 : ${this.state.modifyButtonText}=====`);

    if (this.state.modifyButtonText === '수정') {
      this.setState({
        ...this.state,
        uniqueDisable: false,
        modifyButtonText: '변경사항저장'
      });
      Toast.show({
        text: '입금상태를 수정합니다.\n완료 후 저장을 꼭 눌러주세요!',
        duration: 3000,
        style: styles_Toast.container
      });
    } else if (this.state.modifyButtonText === '등록') {
      Toast.show({
        text: '새 결제를 등록하였습니다.',
        duration: 3000,
        style: styles_Toast.container
      });
      this.setState({
        ...this.state,
        uniqueDisable: true,
        disabled: true,
        modifyButtonText: '수정'
      });
      this.handleSubmit();
    } else if (this.state.modifyButtonText === '변경사항저장') {
      this.setState({
        ...this.state,
        uniqueDisable: true,
        modifyButtonText: '수정'
      });
      Toast.show({
        text: '변경사항을 저장하였습니다.',
        duration: 3000,
        style: styles_Toast.container
      });
    }
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
    const singlePay = this.state.singlePay.replace(/[^0-9]/g, '');
    let payment: Payment = {
      priceBook: {
        totalPrice: Number(this.state.totalPay),
        billImgSrc: this.state.billImgSrc,
        count: this.state.peopleCnt,
        partyDate,
        title: this.state.title,
        transCompleted: false,
        fixedTotalPrice: Number(singlePay)
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
    console.log('=======sumitted!======', priceBook);
    this.props.navigation.navigate('PaymentList');
  };

  handleConfirmModified = async () => {
    console.log('수정!!');
    const askNotiAPI = config.serverAddress + '/users/pushtoken';
    const askTransRcordAPI = config.serverAddress + '/payment/ispayed';

    //거래레코드 ispayed 상태 변경 요청
    const payedTrans = [];
    this.state.chosenList.forEach(person => {
      if (person.askConfirm) {
        payedTrans.push(person.transId);
      }
    });
    console.log('payedTrans', payedTrans);
    const body = { paymentId: payedTrans };
    const transRcords = await fetch(askTransRcordAPI, {
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    //푸시노티 API
    const user = await firebase.auth().currentUser;
    console.log(this.state.chosenList);
    const party = [];
    this.state.chosenList.forEach(person => {
      if (person.askConfirm === true) {
        party.push(person.id);
      }
    });
    let pushBody = JSON.stringify({
      pricebookId: this.state.pricebookId,
      title: this.state.title,
      msg: ` ${user.displayName} : 입금이 확인되었습니다.`,
      target: 'participant',
      participant: party
    });
    let pushRes = await fetch(config.serverAddress + '/users/pushtoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: pushBody
    });
    let res = await pushRes.json();
    console.log(res);
    this.toModifyMode();
    //새로고침

    this.componentDidMount();
    return;
  };
  //handleClose

  // tslint:disable-next-line: max-func-body-length
  render() {
    console.log(
      'disabled 렌더시에 title',
      this.state.disabled,
      this.state.title
    );
    let { disabled, uniqueDisable, pageTitle } = this.state;
    return (
      <Root>
        <LinearGradient style={{ flex: 1 }} colors={['#e2b3ff', '#937ee0']}>
          <Container style={screenStyles.container}>
            <DrawerHeader title={pageTitle} toggleDrawer={this.toggleDrawer} />
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
                    {disabled ? (
                      <Text style={{ paddingLeft: 128, textAlign: 'center' }}>
                        {this.state.chosenDate.toString()}
                      </Text>
                    ) : (
                      <CustomDatePicker setDate={this.setDate} />
                    )}
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
                    <ChosenFriendListItem
                      name="나"
                      uniqueDisable={this.state.uniqueDisable}
                    />
                    {this.state.chosenList.length > 0
                      ? this.state.chosenList.map((person, i) => {
                          console.log('///////////map///////////', person);
                          return (
                            <ChosenFriendListItem
                              modifyButtonText={this.state.modifyButtonText}
                              mode={pageTitle}
                              key={i}
                              person={person}
                              changePayed={this.changePayedTrans}
                              askConfirm={person.askConfirm}
                            />
                          );
                        })
                      : null}
                  </View>
                  <SplitPayment
                    splitPayment={this.state.singlePay}
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
              goBack={this.handleGoback}
              handleConfirm={this.handleConfirmModified}
            />
          </Container>
        </LinearGradient>
      </Root>
    );
  }
}
