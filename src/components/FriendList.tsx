import React, { Component } from 'react';
import {
  Container,
  Grid,
  Content,
  Card,
  CardItem,
  Body,
  Col,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Button
} from 'native-base';
import { Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

interface Props {}

export default class FriendList extends Component<Props> {
  state = { friendList: [] };
  //{name: , phone:, checked:true}
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
        <List>
          {
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  square
                  source={{
                    uri:
                      'https://via.placeholder.com/728x90.png?text=src by redux'
                  }}
                />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text>010-1111-2222</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          }
        </List>
      </Container>
    );
  }
}
