import * as React from 'react';
import { Text } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { screenStyles } from '../screenStyles';
interface Props {
  label: string;
  onChange: any;
  disabled: boolean;
  keyT?: string;
  placeholder?: string;
  txt: string;
}

const InputItem: React.FC<Props> = ({
  label,
  onChange,
  disabled,
  keyT,
  placeholder,
  txt
}) => {
  const KeyType = keyT ? keyT : 'default';

  const price = txt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <Item fixedLabel>
      <Label style={screenStyles.inputItemLabel}>{label}</Label>
      <Input
        style={screenStyles.inputItemBody}
        onChange={onChange}
        disabled={disabled}
        keyboardType={KeyType}
        placeholder={placeholder}
        placeholderTextColor="#c2c2c4"
        value={label === '총 금액' ? price : txt}
      />
    </Item>
  );
};

export default InputItem;
