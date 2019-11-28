import { StyleSheet } from 'react-native';

const screenStyles = StyleSheet.create({
  inputLabel: {
    color: '#15181a',
    fontWeight: 'bold',
    fontSize: 16,
    borderRightColor: 'grey',
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

export default screenStyles;
