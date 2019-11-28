import * as React from 'react';
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
      <Label style={{ color: 'grey' }}>{label}</Label>
      <Input
        style={{ paddingLeft: 20 }}
        onChange={onChange}
        disabled={disabled}
        keyboardType={KeyType}
      />
    </Item>
  );
};

export default InputItem;
