import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
// import {ActivityIndicator} from 'react-native-paper';
export default function SimpleLottie() {
  useEffect(() => {
    fadeIn();
  }, []);
  const SlideInLeft = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change SlideInLeft value to 1 in 5 seconds
    Animated.timing(SlideInLeft, {
      toValue: 2,
      // duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: SlideInLeft.interpolate({
              inputRange: [0, 10],
              outputRange: [0, 1],
              // extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <Image
        style={{
          justifyContent: 'center',
          position: 'absolute',
          alignSelf: 'center',
          top: 240,
        }}
        source={require('../assets/gif/EXfZ.gif')}
      />
    </Animated.View>
  );
}
