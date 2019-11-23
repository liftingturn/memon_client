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
interface Props {}

export default class FriendList extends Component<Props> {
  componentDidMount() {
    //주소록 가져와서, state에 주소록 넣어준다.
  }

  render() {
    return (
      <Container>
        <Text>friend list</Text>
      </Container>
    );
  }
}
