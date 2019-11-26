import React, { Component } from 'react';
import {
  Container,
  Grid,
  Content,
  Card,
  CardItem,
  Body,
  Col,
  List
} from 'native-base';
import { Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import FriendListItem from './FriendListItem';

interface Props {
  addChosen: Function;
  chosen: object[];
}
interface Contact {
  name: string;
  phone: string;
  clicked: boolean;
}
export default class FriendList extends Component<Props> {
  state = { friendList: [], chosen: this.props.chosen };
  //{name: , phone:, checked:true}
  chosenNumbers = this.state.chosen.length
    ? this.state.chosen.map(chosen => {
        return chosen.phone;
      })
    : [];

  componentDidMount = async () => {
    console.log(this.chosenNumbers);
    //주소록 가져와서, state에 주소록 넣어준다.
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS]
      });

      if (data.length > 0) {
        let newList = [];
        for (let i = 1; i < data.length; i++) {
          if (data[i].phoneNumbers) {
            let contact: Contact = {
              name: data[i].name,
              phone: data[i].phoneNumbers[0].number,
              clicked: this.chosenNumbers.includes(
                data[i].phoneNumbers[0].number
              )
                ? true
                : false
            };
            newList.push(contact);
          }
        }
        this.setState({ friendList: newList });
        // console.log(data[1].name, data[1].phoneNumbers[0].number); //0번은 제외하고 array map 해야함. 0은 번호정보없는 자기자신
      }
    }
  };

  handleChoose = phone => {
    for (let i = 0; i < this.state.friendList.length; i++) {
      const chosen = this.state.friendList[i];
      if (chosen.phone === phone) {
        chosen.clicked = !chosen.clicked;
      }
    }
    const chosen: object[] = this.state.friendList.filter(person => {
      return person.clicked === true;
    });

    this.props.addChosen(chosen);
  };

  render() {
    return (
      <Container style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginTop: 10, alignSelf: 'center' }}>
          Pick your Party
        </Text>
        <Content>
          <List>
            {this.state ? (
              this.state.friendList.map((contact, i) => {
                return (
                  <FriendListItem
                    key={i}
                    name={contact.name}
                    phone={contact.phone}
                    handleChoose={this.handleChoose}
                    clicked={contact.clicked}
                  />
                );
              })
            ) : (
              <Text>''</Text>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}
