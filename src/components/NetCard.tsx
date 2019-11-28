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
interface Props {
  header?: string;
  body: string;
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
                  style={{ borderRadius: 5, backgroundColor: 'transparent' }}
                >
                  <Text style={{ fontSize: 20, color: 'grey' }}>
                    {this.props.header ? this.props.header : ''}
                  </Text>
                </CardItem>
                <CardItem
                  style={{ borderRadius: 5, backgroundColor: 'transparent' }}
                >
                  <Body>
                    <Text style={{ fontSize: 15, color: 'darkgrey' }}>
                      {this.props.body ? this.props.body : ''}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}
