import React from 'react';
import {View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
export default function location() {
  Geolocation.getCurrentPosition(info => console.log(info));
  return (
    <View>
      <Text>Azeem</Text>
    </View>
  );
}
