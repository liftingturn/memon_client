import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
export interface Props {}

export interface State {}

export default class PhoneInputScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topContainer}>
          <Text> </Text>
          <Text> </Text>

          <Text>memon 이용을 위해 추가정보를 입력해주세요.</Text>
        </View>
        <View style={this.styles.formAlign}>
          <Item success style={this.styles.item}>
            <Input
              style={this.styles.input}
              placeholder="phone number"
              placeholderTextColor="#8f6fa6"
              keyboardType="numeric"
              // /Success Input
            />
            <Icon name="checkmark-circle" style={{ color: '#5f3363' }} />
          </Item>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    topContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    formAlign: {
      flex: 2,
      //   justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      width: 300,
      borderColor: 'grey'
    },
    input: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#141414',
      fontSize: 20
    }
  });
}
