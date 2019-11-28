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

  handlePress = () => {
    this.props.handleSelect(this.props.phone);
  };

  render() {
    const color = this.props.clicked ? '#e2d3f5' : '#f7f7f7';
    const iconColor = this.props.clicked ? '#5745a1' : '#e2d3f5';
    const iconName = this.props.clicked ? 'check' : 'circle';
    const Phone = this.props.phone;
    const printPhone =
      Phone.length === 11
        ? Phone.substring(0, 3) +
          '-' +
          Phone.substring(3, 7) +
          '-' +
          Phone.substring(7)
        : Phone.substring(0, 3) +
          '-' +
          Phone.substring(3, 6) +
          '-' +
          Phone.substring(6);
    return (
      <ListItem
        onPress={this.handlePress}
        style={{
          height: 60,
          borderBottomWidth: 0,
          backgroundColor: color,
          marginLeft: 0
        }}
      >
        <Left
          style={{ marginLeft: 20, backgroundColor: 'transparent', flex: 1 }}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={30}
            style={{ color: iconColor, marginLeft: 15 }}
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
          <Text style={{ marginBottom: 0 }}>{printPhone}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default FriendListItem;
