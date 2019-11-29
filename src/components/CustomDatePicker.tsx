import React from 'react';
import { DatePicker, Item, Input } from 'native-base';
import { View } from 'react-native';
const CustomDatePicker = props => {
  return (
    <View style={{ flex: 2.2 }}>
      <DatePicker
        defaultDate={new Date()}
        minimumDate={new Date(2018, 1, 1)}
        // maximumDate={new Date()}
        locale="ko"
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={true}
        animationType="fade"
        androidMode="default"
        placeHolderText="날짜를 선택해주세요."
        textStyle={{ color: 'green' }}
        placeHolderTextStyle={{
          color: '#c2c2c4',
          backgroundColor: 'transparent',
          paddingLeft: 15
        }}
        onDateChange={props.setDate}
        disabled={props.disabled}
      />
    </View>
  );
};
export default CustomDatePicker;
