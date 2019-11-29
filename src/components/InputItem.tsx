import * as React from 'react';
import { Item, Label, Input } from 'native-base';
import { screenStyles } from '../screenStyles';
interface Props {
  label: string;
  onChange: any;
  disabled: boolean;
  keyT?: string;
  placeholder?: string;
}

const InputItem: React.FC<Props> = ({
  label,
  onChange,
  disabled,
  keyT,
  placeholder
}) => {
  const KeyType = keyT ? keyT : 'default';
  return (
    <Item fixedLabel>
      <Label style={screenStyles.inputLabel}>{label}</Label>
      <Input
        style={{ paddingLeft: 15, fontSize: 16, color: '#3b3b3b' }}
        onChange={onChange}
        disabled={disabled}
        keyboardType={KeyType}
        placeholder={placeholder}
        placeholderTextColor="#c2c2c4"
      />
    </Item>
  );
};

export default InputItem;
