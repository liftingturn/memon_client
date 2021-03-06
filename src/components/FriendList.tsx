import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { Text } from 'react-native';
import FriendListItem from './FriendListItem';

interface Props {
  handleSelect: Function;
  friendList: any;
}

export default class FriendList extends Component<Props> {
  state = { friendList: this.props.friendList };

  render() {
    return (
      <Container style={{ marginBottom: 10, borderRadius: 5 }}>
        <Text style={{ fontSize: 20, marginVertical: 10, alignSelf: 'center' }}>
          Pick your Party
        </Text>
        <Content style={{ backgroundColor: '#f7f7f7' }}>
          <List>
            {this.state.friendList ? (
              this.state.friendList.map((person, i) => {
                return (
                  <FriendListItem
                    key={i}
                    name={person.name}
                    phone={person.phone}
                    handleSelect={this.props.handleSelect}
                    clicked={person.clicked}
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
