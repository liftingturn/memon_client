import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import * as firebase from 'firebase';
// require('dotenv').config();

// const firebaseConfig = process.env.fbconfig;

// firebase.initializeApp(firebaseConfig);

// try {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user != null) {
//       console.log('We are authenticated now!');
//     } else {
//       console.log('auth fail');
//     }

//     // Do other things
//   });
// } catch (err) {
//   console.log('err:', err);
// }

export default function App() {
  return (
    <View style={styles.container}>
      <Text>by joon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
