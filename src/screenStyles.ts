import { StyleSheet } from 'react-native';

const screenStyles = StyleSheet.create({
  inputLabel: {
    color: 'grey',
    fontWeight: '300',
    fontSize: 15,
    borderRightColor: '#c2c2c4',
    borderRightWidth: 1,
    flex: 1
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
    color: '#f6f6f6'
  },
  iconBtn: {
    backgroundColor: 'transparent',
    elevation: 0
  }
});

const styles_newPayment = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: 'transparent'
  },
  form: {
    width: 350,
    backgroundColor: '#f5effb',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 30,
    elevation: 5
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

export { screenStyles, styles_newPayment };
