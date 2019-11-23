import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Left, Thumbnail, Body, Right, Button } from 'native-base';
import ButtonChoice from './ButtonChoice';

interface Props {
  name: string;
  phone: string;
  handleEvent: Function;
}
class FriendListItem extends React.Component<Props> {
  ///테스트용 랜덤 아바타
  randomAvatar = () => {
    return (
      'https://api.adorable.io/avatars/' + Math.floor(Math.random() * 5000)
    );
  };

  styles = StyleSheet.create({
    text: {
      marginVertical: 3
    }
  });

  testChosen = [];
  handleEvent = phone => {
    this.props.handleEvent(phone);
  };

  render() {
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            style={{ borderRadius: 20 }}
            square
            source={{
              uri: this.randomAvatar()
            }}
          />
        </Left>
        <Body>
          <Text
            style={{ ...this.styles.text, fontWeight: 'bold', fontSize: 15 }}
          >
            {this.props.name}
          </Text>
          <Text style={this.styles.text}>{this.props.phone}</Text>
        </Body>
        <Right>
          <ButtonChoice
            clicked="수금"
            unClicked="선택"
            handleEvent={this.handleEvent.bind(this)}
            arg={this.props.phone}
          />
        </Right>
      </ListItem>
    );
  }
}

export default FriendListItem;
