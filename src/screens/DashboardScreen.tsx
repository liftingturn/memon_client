import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Dashboard!</Text>
      </View>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
