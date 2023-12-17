import React, {useContext} from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ThemeContext} from '../../constants/index';
import {BLACK, WHITE} from '../../constants/color';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default function Welcome({navigation}) {
  //   console.log(Platform);
  const {theme, myColors, changeTheme} = useContext(ThemeContext.ThemeContext);
  console.log(theme);
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  return (
    <View style={Styles.container}>
      <Image
        style={Styles.headImg}
        source={require('../../assets/img/group.png')}
      />
      {/* <Text style={Styles.WelcomeText}>Welcome to</Text> */}
      <View style={Styles.rowView}>
        <Image
          style={Styles.logoImg}
          source={require('../../assets/img/logo.png')}
        />
        <Text style={Styles.WelcomlogoText}>CleanX</Text>
      </View>
      <Text style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
        Prevent littering and dispose garbage appropriately. Many of us have a
        terrible habit of disposing the garbage right on the spot where we are
        sitting or standing
      </Text>
      <View style={Styles.BtnView}>
        <TouchableOpacity
          style={Styles.WelcomeloginBtnView}
          onPress={() =>
            navigation.navigate('login', {
              paramKey: 1,
            })
          }>
          <Text style={Styles.WelcomeloginBtn}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.SignUpBtnView}
          onPress={() =>
            navigation.navigate('SignUp1', {
              paramKey: 0,
            })
          }>
          <Text style={Styles.SignUpBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: 255,
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
    bottom: 80,
    right: 80,
    // left: 1,
  },
  rowView: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: Platform.OS === 'ios' ? 0 : 35,
  },
  WelcomlogoText: {
    color: '#5da552',
    bottom: 55,
    right: 80,
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
  },
  WelcomeloginBtnView: {
    backgroundColor: '#5da552',
    width: 300,
    padding: 13,
    borderRadius: 10,
  },
  WelcomeloginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
  SignUpBtnView: {
    width: 300,
    padding: 13,
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    borderColor: 'grey',
    top: 10,
  },
  SignUpBtn: {
    textAlign: 'center',
    padding: 5,
    color: BLACK,
  },
});
