import React from 'react';
import {
  Text,
  WebViewIOSLoadRequestEvent,
  ShadowPropTypesIOS
} from 'react-native';
import { Item, Label, Input } from 'native-base';

interface Props {
  label: string;
  onChange: any;
  disabled: boolean;
  keyT?: string;
}

const InputItem: React.FC<Props> = ({ label, onChange, disabled, keyT }) => {
  const KeyType = keyT ? keyT : 'default';
  return (
    <Item fixedLabel>
      <Label>{label}</Label>
      <Input onChange={onChange} disabled={disabled} keyboardType={KeyType} />
    </Item>
  );
};

export default InputItem;
