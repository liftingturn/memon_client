import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

const ChosenFriendListItem = props => {
  return (
    <Button disabled={true}>
      <Text>{props.name}</Text>
    </Button>
  );
};

export default ChosenFriendListItem;
