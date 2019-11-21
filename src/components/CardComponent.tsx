import React, { Component } from 'react';
import {
  Container,
  Grid,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Col,
  View
} from 'native-base';
interface Props {
  header?: string;
  body: string;
  footer?: string;
}
export default class CardComponent extends Component<Props> {
  render() {
    return (
      <View>
        <Card style={{ margin: 10 }}>
          <CardItem header>
            <Text>{this.props.header ? this.props.header : ''}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{this.props.body ? this.props.body : ''}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>{this.props.footer ? this.props.footer : ''}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
