import React from 'react';
import { DatePicker } from 'native-base';
const CustomDatePicker = props => {
  return (
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
        color: '#FFFFFF',
        backgroundColor: '#339EFF'
      }}
      onDateChange={props.setDate}
      disabled={props.disabled}
    />
  );
};
export default CustomDatePicker;
