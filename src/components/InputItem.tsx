import * as React from 'react';
import { Item, Label, Input } from 'native-base';

interface Props {
  label: string;
  onChange: any;
  disabled: boolean;
  keyT?: string;
  placeholer?: string;
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
      <Label style={{ color: 'grey' }}>{label}</Label>
      <Input
        style={{ paddingLeft: 15, fontSize: 16 }}
        onChange={onChange}
        disabled={disabled}
        keyboardType={KeyType}
        placeholder={placeholder}
        placeholderTextColor="#907ee0"
      />
    </Item>
  );
};

export default InputItem;
