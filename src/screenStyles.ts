import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const styles_LoadingScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sub: {
    backgroundColor: 'transparent',
    fontWeight: '300',
    color: '#fff',
    fontSize: RFPercentage(3)
  },
  main: {
    backgroundColor: 'transparent',
    fontWeight: '500',
    color: '#fff',
    fontSize: RFPercentage(8)
  },
  footer: { justifyContent: 'center', backgroundColor: 'transparent' },
  footerTxt: { color: '#fff', fontSize: 15, fontWeight: '400' }
});

const screenStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'pink'
  },
  inputItemLabel: {
    color: 'grey',
    fontWeight: '300',
    fontSize: 15,
    fontFamily: 'NotoSans_regular',
    borderRightColor: '#c2c2c4',
    borderRightWidth: 1,
    flex: 1,
    textAlign: 'center'
  },
  inputItemBody: {
    paddingLeft: 15,
    fontSize: 16,
    color: '#3b3b3b'
  },
  inputTxt: {
    flex: 2.2,
    paddingLeft: 14,
    fontSize: 16,
    color: '#3b3b3b',
    fontFamily: 'NotoSans_regular'
  },
  container: {
    marginTop: 23,
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 5
    // justifyContent: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    textAlign: 'left',
    height: 70
  },
  headerBodyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f6f6f6',
    fontFamily: 'NotoSans_regular'
  },
  iconBtn: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  blacktext: {
    color: 'black',
    borderRightColor: '#c2c2c4',
    borderRightWidth: 1
  },
  justifyC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const styles_newPayment = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: 'transparent'
  },
  dunningBtnItem: {
    paddingRight: 40,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent'
  },
  dunningBtn: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    borderColor: '#eff0eb',
    borderWidth: 3
  },
  dunningBtnTxt: {
    color: 'black',
    fontFamily: 'NotoSans_regular',
    fontSize: 15
  },
  form: {
    width: 350,
    backgroundColor: '#f5effb',
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 30,
    elevation: 5,
    borderColor: '#eff0eb',
    borderWidth: 3
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 50
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  }
});

const styles_Toast = {
  container: {
    height: 50,
    margin: 3,
    marginBottom: 50,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  txt: {
    paddingHorizontal: 20
  }
};

const styles_PaymentList = StyleSheet.create({
  label: {
    fontSize: 15,
    borderRightColor: '#c2c2c4',
    borderRightWidth: 1,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'NotoSans_regular'
  },
  statusTxt: {
    fontSize: 12,
    color: 'black',
    marginBottom: 5
  },
  infoTxt: {
    fontSize: 16,
    color: '#3b3b3b',
    fontFamily: 'NotoSans_regular',
    flex: 1,
    paddingLeft: 15
  }
});

const styles_Dashboard = StyleSheet.create({
  userCardItem: {
    borderRadius: 15,
    borderColor: '#eff0eb',
    borderWidth: 2
  },
  thumnail: {
    borderRadius: 20,
    marginHorizontal: 10,
    borderColor: '#eff0eb',
    borderWidth: 2
  },
  userName: {
    fontFamily: 'NotoSans_regular',
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 5,
    backgroundColor: '#fbfafc',
    color: '#252625'
  },
  greetingBody: {
    marginLeft: 20,
    marginRight: 0,
    fontFamily: 'NotoSans_regular',
    fontSize: 14,
    color: 'grey'
  }
});
const styles_NetCard = {
  elementItem: {
    flex: 1,
    elevation: 1,
    margin: 5,
    marginLeft: 7,
    padding: 5,
    borderRadius: 5
  },
  elementLabel: {
    fontFamily: 'NotoSans_regular',
    fontSize: 15,
    color: 'grey',
    flex: 1.5,
    borderRightWidth: 2,
    borderRightColor: '#907ee0',
    textAlign: 'center'
  },
  elementMoney: {
    fontFamily: 'NotoSans_regular',
    flex: 2.5,
    fontSize: 17,
    color: '#252625',
    textAlign: 'center'
  }
};

const styles_ChosenFrientListItem = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: '#bba8e0',
    borderBottomWidth: 1,
    height: 28,
    marginVertical: 3,
    marginRight: 0,
    marginLeft: 10,
    borderRadius: 2,
    justifyContent: 'center',
    elevation: 0
  },
  txt: {
    color: 'grey',
    fontWeight: '400',
    fontSize: 15
  },
  payedModify: {
    color: '#bba8e0',
    fontWeight: '600',
    marginRight: 20
  },
  askConfirm: {
    marginRight: 10,
    paddingHorizontal: 10,
    height: 19
  },
  status: {
    fontWeight: '600',
    marginRight: 20
  },
  section: {
    flex: 1
  }
});

const styles_SingleView = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    paddingTop: 35
  },
  item: { marginVertical: 10, paddingBottom: 10 }
});
export {
  styles_LoadingScreen,
  styles_SingleView,
  styles_Dashboard,
  styles_NetCard,
  styles_PaymentList,
  screenStyles,
  styles_newPayment,
  styles_Toast,
  styles_ChosenFrientListItem
};
