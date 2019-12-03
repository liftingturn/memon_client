import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import ButtonModify from './ButtonModify';

const NewPayFooter = props => {
  return (
    <Footer>
      <FooterTab style={{ backgroundColor: '#FFF' }}>
        <ButtonModify
          label={props.label}
          onPress={props.onPress}
          handleConfirm={props.handleConfirm}
        />
      </FooterTab>
    </Footer>
  );
};

export default NewPayFooter;
