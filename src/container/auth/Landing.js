import React, {useContext, useEffect, useRef} from 'react';
import {TouchableOpacity, Platform, Dimensions, Animated} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ThemeContext} from '../../constants/index';
import {BLACK, WHITE} from '../../constants/color';
import UserType from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
export default function Landing({navigation}) {
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    fadeIn();
  }, [user]);
  //   console.log(Platform);
  const {theme, myColors, changeTheme} = useContext(ThemeContext.ThemeContext);
  console.log(theme);
  const SlideInLeft = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change SlideInLeft value to 1 in 5 seconds
    Animated.timing(SlideInLeft, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: SlideInLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
        },
        Styles.container,
      ]}>
      <Image
        style={Styles.logoImg}
        source={require('../../assets/img/logo.png')}
      />
      <View style={Styles.rowView}>
        <Text style={Styles.WelcomlogoText}>Welcome to CleanX</Text>
      </View>
      <Image
        style={Styles.headImg}
        source={require('../../assets/img/Langing.png')}
      />
      {/* <Text style={Styles.WelcomeText}>Welcome to</Text> */}

      <View style={Styles.BtnView}>
        <TouchableOpacity
          style={Styles.WelcomeloginBtnView}
          onPress={() =>
            navigation.navigate('Welcome', {
              paramKey: 1,
            })
          }>
          <Image
            style={Styles.user}
            source={require('../../assets/img/profile.png')}
          />
          <Text style={Styles.WelcomeloginBtn}>I am User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.SignUpBtnView}
          onPress={() =>
            navigation.navigate('login', {
              paramKey: 0,
            })
          }>
          <Image
            style={Styles.Vendor}
            source={require('../../assets/img/Vendor.png')}
          />
          <Text style={Styles.SignUpBtn}>I am Vender</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headImg: {
    position: 'relative',
    bottom: 50,
    height: 290,
    width: Platform.OS === 'ios' ? 380 : 350,
    margin: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  WelcomeText: {
    bottom: 80,
    right: 150,
  },
  logoImg: {
    height: 100,
    width: 100,
    bottom: 50,
    right: 0,
    //     position: 'absolute',
    // left: 1,
  },
  Vendor: {
    height: 100,
    width: 100,
    bottom: 0,
    right: 10,
    position: 'absolute',
  },
  user: {
    height: 100,
    width: 100,
    bottom: 0,
    right: 10,
    position: 'absolute',
  },
  rowView: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: Platform.OS === 'ios' ? 0 : 35,
  },
  WelcomlogoText: {
    color: '#5da552',
    bottom: 55,
    right: 0,
    fontWeight: 'bold',
    fontSize: 40,
  },
  Text: {
    bottom: 80,
    //     right: 10,
    padding: 10,
  },
  BtnView: {
    padding: 10,
    bottom: 40,
    flexDirection: 'row',
  },
  WelcomeloginBtnView: {
    backgroundColor: '#5da552',
    width: 150,
    height: 150,
    padding: 13,
    borderRadius: 10,
    right: 5,
  },
  WelcomeloginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
    fontWeight: '700',
    fontSize: 20,
  },
  SignUpBtnView: {
    width: 150,
    height: 150,
    padding: 13,
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    borderColor: 'grey',
    //     top: 10,
    left: 5,
  },
  SignUpBtn: {
    textAlign: 'center',
    padding: 4,
    color: BLACK,
    fontWeight: '700',
    fontSize: 20,
  },
});
