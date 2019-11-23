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
/*newPayment 
 state{chosen: []}
 pushChosen= (phone) => {
  this.setState({chosen: [...chosen]})
}
*/
interface Contact {
  name: string;
  phone: string;
  clicked: false;
}
export default class FriendList extends Component {
  state = { friendList: [], chosen: [] };
  //{name: , phone:, checked:true}

  componentDidMount = async () => {
    //주소록 가져와서, state에 주소록 넣어준다.
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS]
      });

      if (data.length > 0) {
        let newList = [];
        for (let i = 1; i < data.length; i++) {
          let contact: Contact = {
            name: data[i].name,
            phone: data[i].phoneNumbers[0].number,
            clicked: false
          };
          newList.push(contact);
        }
        this.setState({ friendList: newList });
        // console.log(data[1].name, data[1].phoneNumbers[0].number); //0번은 제외하고 array map 해야함. 0은 번호정보없는 자기자신
      }
    }
  };

  testChosen = [];
  //모달에 속한 어레이라 모달 새로 켤 때마다 초기화
  //모달 닫았다 열어도 이전 참여자 목록 유지하려면 상위 컴포넌트로 또 프롭스 연결하든지, 리덕스로 스토어 관리해야할 듯!
  handleEvent = phone => {
    for (let i = 0; i < this.state.friendList.length; i++) {
      const chosen = this.state.friendList[i];
      if (chosen.phone === phone) {
        chosen.clicked = !chosen.clicked;
      }
    }
    const test = this.state.friendList.filter(friend => {
      return friend.clicked === true;
    });
    console.log('///////testChosen///////', test);
  };

  render() {
    return (
      <Container>
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
                    handleEvent={this.handleEvent}
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
