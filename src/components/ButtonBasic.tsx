import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const ButtonBasic = props => {
  const disabled = props.disabled ? props.disabled : false;
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#f6f5fa',
      alignSelf: 'center',
      width: 'auto',
      padding: 20,
      marginBottom: 30,
      borderRadius: 50,
      elevation: 1
    },
    txt: {
      color: '#907ee0',
      fontSize: 17,
      fontWeight: '400'
    },
    icon: {
      color: '#907ee0'
    }
  });
  return (
    <Button style={styles.button} onPress={props.onPress} disabled={disabled}>
      {props.type === 'txt' ? (
        <Text style={styles.txt}>{props.label}</Text>
      ) : (
        <MaterialIcons name={props.label} size={25} style={styles.icon} />
      )}
    </Button>
  );
};

export default ButtonBasic;
