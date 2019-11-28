import React from 'react';
import { DatePicker, Item } from 'native-base';
const CustomDatePicker = props => {
  return (
    <Item style={{ paddingLeft: 0, marginLeft: 0 }}>
      <DatePicker
        defaultDate={new Date()}
        minimumDate={new Date(2018, 1, 1)}
        // maximumDate={new Date()}
        locale="ko"
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType="fade"
        androidMode="default"
        placeHolderText="날짜를 선택해주세요."
        textStyle={{ color: 'green' }}
        placeHolderTextStyle={{
          color: '#907ee0',
          backgroundColor: '#fff'
        }}
        onDateChange={props.setDate}
        disabled={props.disabled}
      />
    </Item>
  );
};
export default CustomDatePicker;
