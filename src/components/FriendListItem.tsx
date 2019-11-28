import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Left, Thumbnail, Body, Right, Button } from 'native-base';
import ButtonChoice from './ButtonChoice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  name: string;
  phone: string;
  handleSelect: Function;
  clicked: boolean;
}
class FriendListItem extends React.Component<Props> {
  styles = StyleSheet.create({
    text: {
      marginVertical: 3
    }
  });

  render() {
    const color = this.props.clicked ? '#e2d3f5' : 'transparent';
    return (
      <ListItem>
        <Left style={{ backgroundColor: 'transparent', flex: 1 }}>
          <MaterialCommunityIcons
            name="circle"
            size={30}
            style={{ color: '#e2d3f5', marginLeft: 15 }}
          />
        </Left>
        <Body style={{ borderBottomWidth: 0, marginLeft: 20, flex: 3 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15
            }}
          >
            {this.props.name}
          </Text>
          <Text style={{ marginBottom: 0 }}>{this.props.phone}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0, flex: 2 }}>
          <ButtonChoice
            clickedLabel="수금"
            unClickedLabel="선택"
            handleSelect={this.props.handleSelect}
            phone={this.props.phone}
            clicked={this.props.clicked}
          />
        </Right>
      </ListItem>
    );
  }
}

export default FriendListItem;
