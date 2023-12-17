import React from 'react';
import {View, Text} from 'react-native';

export default function costoumText({text, style}) {
  return (
    <View>
      <Text style={style}>{text}</Text>
    </View>
  );
}
