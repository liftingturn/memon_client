import React from 'react';
import { Text, View } from 'react-native';
import { Item, Label, Input, Right, Button } from 'native-base';
import screenStyles from '../screenStyles';

const SplitPayment = props => {
  return (
    <Item fixedLabel>
      <Label style={{ ...screenStyles.inputLabel, fontWeight: '600' }}>
        1 / N
      </Label>
      <View style={{ flex: 2.2 }}>
        <Item>
          <Input
            style={{ paddingLeft: 15, fontSize: 16, flex: 1 }}
            placeholder={props.splitPayment}
            placeholderTextColor="#907ee0"
            disabled={true}
          />
          {props.remainder ? (
            <Right style={{ flex: 1 }}>
              <Button
                style={{
                  height: 30,
                  backgroundColor: '#907be0',
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ color: '#fff' }}>- {props.remainder} 원</Text>
              </Button>
            </Right>
          ) : null}
        </Item>
      </View>
    </Item>
  );
};

export default SplitPayment;
