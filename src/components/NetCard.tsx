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
              height: 300,
              paddingHorizontal: 40,
              paddingTop: 40
            }}
          >
            <Content>
              <Card
                style={{
                  borderRadius: 15,
                  elevation: 5,
                  backgroundColor: '#fbfafc',
                  borderColor: '#eff0eb',
                  borderWidth: 3
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
                    style={{
                      fontSize: 17,
                      color: '#8570b5',
                      textAlign: 'left',
                      marginBottom: 10,
                      fontFamily: 'NotoSans_medium',
                      marginLeft: 15
                      // marginTop: 20
                    }}
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
