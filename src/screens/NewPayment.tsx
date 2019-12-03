import React from 'react';
import { View, BackHandler, Alert, Text } from 'react-native';
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
  Toast,
  Input
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
  readyComplete: false;
  showToast: boolean;
  goBack: number;
  successSubmit: boolean;
}

export default class NewPayment extends React.Component<Props> {
  state = {
    pageTitle: '새 거래',
    friendList: [],
    chosenNums: [],
    chosenList: [],
    title: '',
    totalPay: '',
    singlePay: '',
    chosenDate: '',
    peopleCnt: 1,
    printModal: false,
    disabled: false,
    // modifyButtonText: this.props.fromListView ? '수정' : '등록',
    modifyButtonText: '등록',
    email: '',
    pricebookId: '',
    billImgSrc: '',
    uniqueDisable: false,
    readyComplete: false,
    transCompleted: false,
    refreshing: false,
    showToast: false,
    goBack: 0,
    successSubmit: false
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
        pageTitle: '거래 정보'
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
      const {
        fromListView,
        email,
        pricebookId,
        transCompleted
      } = navigation.state.params;
      //**************************//
      //서버에서 개별결제 페이지 리스폰스 보낼때 참여자 전화번호 같이 보내줘야함
      //참여자 전화번호 추출해서 state.chosenNums=[ 'phone', 'phone', 'phone' ]
      // ---------> 비활성화 클릭하면, 등록된 결제건은 참여자 수정이 불가능합니다.
      const modifyButtonText = transCompleted ? '확인' : '수정';
      if (fromListView) {
        await this.setState({
          ...this.state,
          disabled: true,
          uniqueDisable: true,
          email: email,
          pricebookId: pricebookId,
          modifyButtonText: modifyButtonText,
          pageTitle: '단일 결제 정보',
          transCompleted: transCompleted
        });
        await this.doFetch();
        await this.calcN();
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

  setReadyToClose = () => {
    this.setState({
      ...this.state,
      readyComplete: true,
      modifyButtonText: '거래 종료'
    });
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
    const chosenList = responseJson.paymentObj.map(record => {
      return {
        name: '',
        phone: record.phone,
        id: record.participantId,
        transId: record.id,
        clicked: true,
        isPayed: record.isPayed
      };
    });
    ///// 결제 완료 여부 ///
    await this.setState({
      ...this.state,
      title: responseJson.pricebook.title,
      totalPay: responseJson.pricebook.totalPrice,
      peopleCnt: responseJson.pricebook.count,
      chosenDate: responseJson.pricebook.partyDate,
      billImgSrc: responseJson.pricebook.billImgSrc,
      chosenList: chosenList
    });
    const chosenState = this.state.chosenList;
    console.log('afterFetch', this.state);
    let payedCnt = 1;
    for (let i = 0; i < chosenState.length; i++) {
      if (chosenState[i].isPayed) {
        payedCnt++;
      }
    }
    console.log('transCompleted#########', this.state.transCompleted);
    if (payedCnt === responseJson.pricebook.count) {
      if (!this.state.transCompleted) {
        await this.setReadyToClose();
        console.log('readyComplete#########', this.state.readyComplete);
      }
    }
    return;
  };
  //새로고침
  onRefresh = async () => {
    console.log('refresh!');
    this.setState({ refreshing: true });
    await this.doFetch();
    // memo: 수정후 새로고침인 경우 이름 빈 문자열로 초기화시키지 않도록 분기해야함
    this.setState({ refreshing: false });
  };
  //backHandler
  goBack = () => {
    console.log(this.props.navigation);
    const isView = Boolean(
      this.props.navigation.state.params &&
        this.props.navigation.state.params.fromListView
    );
    if (isView) {
      console.log("goBack it's view");
      this.handleGoback('view');
    } else {
      console.log("goBack it's new");
      this.handleGoback('new');
    }
  };

  handleGoback = from => {
    if (from === 'view') {
      console.log("Handle goBack it's view");
      console.log(this.state.modifyButtonText);
      if (this.state.modifyButtonText === '변경사항저장') {
        Alert.alert('Alert', '수정을 취소합니다.', [
          {
            text: '확인',
            onPress: () => {
              this.props.navigation.state.params.fromListView = false;
              this.props.navigation.navigate('결제목록');
              return;
            }
          },
          {
            text: '취소',
            onPress: () => null,
            style: 'cancel'
          }
        ]);
      } else {
        console.log('조회 후 퇴장');
        this.props.navigation.navigate('결제목록');
        return;
      }
    } else if (from === 'new') {
      console.log("Handle goBack it's new");
      if (this.state.goBack === 0) {
        Toast.show({
          text: '저장이 되지 않았어요!\n한 번 더 누르면 홈으로 갑니다.',
          duration: 2000,
          textStyle: styles_Toast.txt,
          style: styles_Toast.container
        });
        this.setState({ goBack: ++this.state.goBack });
      } else {
        this.setState({ goBack: 0 });
        this.props.navigation.navigate('홈');
      }
    }
  };

  //drawer
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  //form handler functions
  setDate = newDate => {
    this.setState({ ...this.state, chosenDate: newDate });
  };

  onChangeTotalPay = async e => {
    console.log('onchange do', e.nativeEvent.text);
    await this.setState({ ...this.state, totalPay: e.nativeEvent.text });
    this.calcN();
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
      this.setState({ ...this.state, singlePay: '' });
    } else {
      console.log('calcN!!!');

      const smallest = 100;
      const totalPay = this.state.totalPay.toString().replace(/[^0-9]/g, '');
      const MoneyForOne = parseInt(totalPay) / this.state.peopleCnt;
      let change: any = Math.floor(MoneyForOne / smallest) * smallest;
      this.remainder = String(Math.round(MoneyForOne - change));
      console.log('*******change: ', change);
      console.log('*******remainder: ', this.remainder);

      //print format
      let formatStr =
        '₩ ' + change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      await this.setState({
        ...this.state,
        singlePay: formatStr,
        totalPay: totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
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
      peopleCnt: ++cnt,
      chosenNums: chosen,
      chosenList: chosenL
    });
    this.calcN();
    // console.log('friendList', this.state.friendList);
    // console.log('chosenNums', this.state.chosenNums);
    console.log('selectParty - peopleCnt: ', this.state.peopleCnt);
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
    console.log('====네비 파라미터======== : ', this.props.navigation);

    if (this.state.modifyButtonText === '수정') {
      this.setState({
        ...this.state,
        uniqueDisable: false,
        modifyButtonText: '변경사항저장'
      });
      Toast.show({
        text: '입금상태를 수정합니다.\n완료 후 저장을 꼭 눌러주세요!',
        duration: 2000,
        style: styles_Toast.container
      });
    } else if (this.state.modifyButtonText === '등록') {
      await this.handleSubmit();
    } else if (this.state.modifyButtonText === '변경사항저장') {
      this.setState({
        ...this.state,
        uniqueDisable: true,
        modifyButtonText: '수정'
      });
      this.onRefresh();
      Toast.show({
        text: '변경사항을 저장하였습니다.',
        duration: 2000,
        style: styles_Toast.container
      });
    } else if (this.state.modifyButtonText === '거래 종료') {
      this.hadleClose();
      this.props.navigation.navigate('결제목록');
    } else if (this.state.modifyButtonText === '확인') {
      this.props.navigation.navigate('결제목록');
    }
  };

  handleSubmit = async () => {
    const { chosenDate, chosenList, title, totalPay } = this.state;
    const ready = chosenDate && title && totalPay ? true : false;
    if (ready) {
      console.log('===서브밋준비====', {
        chosenDate,
        chosenList: chosenList.length,
        title,
        totalPay
      });
      if (chosenList.length === 0) {
        await Toast.show({
          text: '수금할 참여자를 선택해주세요!',
          duration: 2000,
          style: styles_Toast.container,
          textStyle: styles_Toast.txt
        });
      } else {
        const newPaymentAPI = config.serverAddress + '/payment';
        const user = await firebase.auth().currentUser;
        //         const chosenDate = new Date(this.state.chosenDate);
        const partyDate =
          this.state.chosenDate.getFullYear() +
          '-' +
          this.state.chosenDate.getMonth() +
          '-' +
          this.state.chosenDate.getDate();
        //         const partyDate =
        //       chosenDate.getFullYear() +
        //       '-' +
        //       chosenDate.getMonth() +
        //       '-' +
        //       chosenDate.getDate();
        const singlePay =
          parseInt(this.state.singlePay.replace(/[^0-9]/g, '')) *
          this.state.peopleCnt;
        const totalPay = parseInt(this.state.totalPay.replace(/[^0-9]/g, ''));
        console.log('fixedSinglePay!!!!!!!!', singlePay);
        console.log('peopleCnt!!!!!!!!', this.state.peopleCnt);

        let payment: Payment = {
          priceBook: {
            totalPrice: totalPay,
            billImgSrc: this.state.billImgSrc,
            count: this.state.peopleCnt,
            partyDate,
            title: this.state.title,
            transCompleted: false,
            fixedTotalPrice: singlePay
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
        console.log(priceBook);
        priceBook ? await this.setState({ successSubmit: true }) : null;
        if (this.state.successSubmit) {
          console.log('등록성공');
          await Toast.show({
            text: '새 거래를 등록했습니다.',
            duration: 2000,
            style: styles_Toast.container
          });
          await this.setState({
            ...this.state,
            uniqueDisable: true,
            disabled: true,
            modifyButtonText: '수정'
          });
          !this.state.showToast
            ? this.props.navigation.navigate('결제목록')
            : null;
        } else {
          Toast.show({
            text: '거래를 등록하지 못했습니다.',
            duration: 1000,
            style: styles_Toast.container
          });
        }
      }
    } else {
      Toast.show({
        text: '등록할 거래 정보를 입력해주세요.',
        duration: 2000,
        style: styles_Toast.container,
        textStyle: styles_Toast.txt
      });
    }
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

  hadleClose = async () => {
    console.log('======close Payment======');
    const closeAPI = config.serverAddress + '/pricebook/transCompleted';
    const body = {
      pricebookId: this.props.navigation.state.params.pricebookId
    };
    console.log(body);

    const res = await fetch(closeAPI, {
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    console.log('=======response=======', res);
    if (res.status === 200) {
      Toast.show({
        text: `${this.state.title} 거래가 완료되었습니다.`
      });
    } else {
      Toast.show({
        text: `시스템 오류입니다.`
      });
    }
  };

  // tslint:disable-next-line: max-func-body-length
  render() {
    console.log(
      'disabled 렌더시에 title',
      this.state.disabled,
      this.state.title,
      this.props.navigation
    );
    let { disabled, uniqueDisable, pageTitle } = this.state;
    return (
      <Root>
        <LinearGradient style={{ flex: 1 }} colors={['#b582e8', '#937ee0']}>
          <Container style={screenStyles.container}>
            <DrawerHeader title={pageTitle} toggleDrawer={this.toggleDrawer} />
            <Content
              contentContainerStyle={{
                justifyContent: 'flex-start',
                paddingTop: 50
              }}
            >
              <View style={{ alignItems: 'center', marginBottom: 15 }}>
                {this.props.fromListView ? (
                  <Item style={styles_newPayment.threatenBtnItem}>
                    <Right>
                      <Button style={styles_newPayment.threatenBtn}>
                        <Text style={styles_newPayment.threatenBtnTxt}>
                          🔔 미납자 독촉하기
                        </Text>
                      </Button>
                    </Right>
                  </Item>
                ) : null}
                <Form style={styles_newPayment.form}>
                  <InputItem
                    label="제  목"
                    disabled={disabled}
                    onChange={this.onChangeTitle}
                    placeholder="어떤 모임이었나요?"
                    txt={this.state.title}
                  />
                  <Item fixedLabel>
                    <Label style={screenStyles.inputItemLabel}>모임일</Label>
                    {disabled ? (
                      <Input
                        style={screenStyles.inputItemBody}
                        disabled={true}
                        placeholderTextColor="#c2c2c4"
                        value={this.state.chosenDate}
                      />
                    ) : (
                      <CustomDatePicker setDate={this.setDate} />
                    )}
                  </Item>
                  <InputItem
                    label="총 금액"
                    disabled={disabled}
                    onChange={this.onChangeTotalPay}
                    keyT="numeric"
                    placeholder="총 금액을 입력해주세요"
                    txt={this.state.totalPay}
                  />
                  <Item fixedLabel>
                    <Label style={screenStyles.inputItemLabel}>참여자</Label>
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
                      uniqueDisable={uniqueDisable}
                    />
                    {this.state.chosenList.length > 0
                      ? this.state.chosenList.map((person, i) => {
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
              navigation={this.props.navigation}
            />
          </Container>
        </LinearGradient>
      </Root>
    );
  }
}
