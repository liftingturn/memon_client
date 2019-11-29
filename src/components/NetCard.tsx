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
  Item
} from 'native-base';
import NetCardElement from '../components/NetCardElement';

interface Props {
  header?: string;
  pay: string;
  get: string;
}
export default class NetCard extends Component<Props> {
  render() {
    return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Grid>
          <Col
            style={{
              backgroundColor: 'transparent',
              height: 200,
              paddingHorizontal: 30,
              paddingTop: 50
            }}
          >
            <Content>
              <Card
                style={{
                  margin: 30,
                  borderRadius: 5,
                  elevation: 5,
                  backgroundColor: '#f5effb'
                }}
              >
                <CardItem
                  header
                  style={{
                    borderRadius: 5,
                    backgroundColor: 'transparent',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: 'grey', textAlign: 'left' }}
                  >
                    {this.props.header ? this.props.header : ''}
                  </Text>
                  <NetCardElement label="받을 돈" money={this.props.get} />
                  <NetCardElement label="줄 돈" money={this.props.pay} />
                </CardItem>
              </Card>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}
