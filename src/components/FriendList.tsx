import React, { Component } from 'react';
import {
  Container,
  Grid,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Col
} from 'native-base';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

interface Props {}

export default class FriendList extends Component<Props> {
  componentDidMount = async () => {
    //주소록 가져와서, state에 주소록 넣어준다.
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS]
      });

      if (data.length > 0) {
        // const contact = data[0];
        console.log(data[1].name, data[1].phoneNumbers[0].number); //0번은 제외하고 array map 해야함. 0은 번호정보없는 자기자신
      }
    }
  };

  render() {
    return (
      <Container>
        <Text>friend list</Text>
      </Container>
    );
  }
}
