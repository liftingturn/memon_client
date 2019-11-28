import { StyleSheet } from 'react-native';

const screenStyles = StyleSheet.create({
  container: {
    marginTop: 23,
    flex: 1,
    backgroundColor: 'transparent'
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
    fontWeight: '400',
    color: '#f6f6f6'
  },
  iconBtn: {
    backgroundColor: 'transparent',
    elevation: 0
  }
});

export default screenStyles;
