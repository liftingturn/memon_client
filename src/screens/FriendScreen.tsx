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
import { DrawerHeader } from '../components';

import FriendList from '../components/FriendList';
export interface Props {
  navigation: any;
}

export interface State {}

export default class FriendScreen extends React.Component<Props, State> {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  async componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    if (this.props.navigation.state.params === undefined) {
      alert(':wrench:해당 페이지는 아직 구현중입니다');
      this.props.navigation.navigate('Home');
    }
  }
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
          <Text>This is Content Section</Text>
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
      //   alignItems: 'center',
      justifyContent: 'center'
    }
  });
}
