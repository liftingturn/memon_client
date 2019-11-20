import * as React from 'react';
import { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
export interface Props {}

export interface State {}

export default class PhoneInputScreen extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Item success>
            <Input placeholder="Textbox with Success Input" />
            <Icon name="checkmark-circle" />
          </Item>
        </Content>
      </Container>
    );
  }
}
