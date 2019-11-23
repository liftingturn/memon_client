import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon
} from 'native-base';
export interface State {}
export interface Props {
  navigation: any;
}
export default class Profile extends React.Component<Props, State> {
  state = { key: 'value' };
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <Container style={this.styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.toggleDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>Header</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>This is Content Profile page</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  styles = StyleSheet.create({
    container: {
      marginTop: 24,
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center'
    }
  });
}
