import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  // TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import {TextInput, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PhoneNo({navigation}) {
  const [phoneNumber, addPhoneNumber] = useState();
  const [visible, setVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [indicator, setIndicator] = useState(false);

  var myHeaders = new Headers();
  myHeaders.append('x-as-apikey', '028617bf-91f8-4dc8-9dd2-7e96f4687d3d');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    messageFormat:
      'Welcome to CleanX App, this is your OTP ${otp}. Please do not share it with anyone',
    phoneNumber: `${phoneNumber}`,
    otpLength: 6,
    otpValidityInSeconds: 120,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  AntDesign.loadFont();
  const GetOTP = async () => {
    setIndicator(true);
    if (phoneNumber && phoneNumber.length == 13) {
      await fetch('https://otp.apistack.run/v1/sendOtp', requestOptions)
        .then(response => response.clone().json())
        .then(async result => {
          // let reqId = await result.data().requestId;
          console.log('result-->>', result);

          navigation.navigate('VerifyOTP', {phoneNumber, result});
          setIndicator(false);
        })
        .catch(error => {
          console.log('error', error), setIndicator(false);
        });

      // console.log(phoneNumber);
    } else {
      alert('Please enter valid phone number'), setIndicator(false);
    }
  };
  // console.log(visible);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>OTP Verification</Text>

        <Image
          style={{height: 200, width: 200, alignSelf: 'center'}}
          source={require('../../../assets/img/logo.png')}
        />
        <Text style={{color: 'grey', fontWeight: '700'}}>
          Verify Your Phone Number to get better experience{' '}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {visible ? (
            <Text style={{position: 'absolute', top: 46, fontSize: 16}}>
              +92
            </Text>
          ) : null}
          <TextInput
            label="Phone Number"
            theme={{
              colors: {
                primary: 'green',
                underlineColor: 'transparent',
                background: 'transparent',
              },
            }}
            underlineColor="transparent"
            style={styles.Input}
            autoCapitalize={'none'}
            placeholder="1234567890"
            onChangeText={text => addPhoneNumber('+92' + text)}
            keyboardType={'phone-pad'}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            onChange={setSelection}
          />
          <AntDesign style={{top: 45, color: 'green'}} name="phone" size={25} />
        </View>
        <TouchableOpacity
          disabled={!isSelected}
          onPress={() => GetOTP()}
          style={[
            styles.loginBtnView,
            {
              backgroundColor: isSelected ? 'green' : '#ffffff',
              backgroundColor: indicator
                ? '#ffffff'
                : isSelected
                ? 'green'
                : '',
              borderWidth: indicator ? 0 : 0.2,
            },
          ]}>
          {indicator ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <View>
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: isSelected ? '#ffffff' : 'grey',
                    // color: indicator ? 'black' : 'black',
                  },
                ]}>
                Get OTP !
              </Text>
              <AntDesign
                style={{
                  color: isSelected ? '#ffffff' : 'grey',
                  position: 'absolute',
                  alignSelf: 'center',
                  right: 71,
                  top: 2,
                }}
                name="doubleright"
                size={25}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {textAlign: 'center', fontSize: 30},
  btnContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  Input: {
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    padding: 10,
    width: 350,
    left: 10,
    right: 10,
    // fontSize: 18,
    height: 70,
    // background: 'transparent',
    // overlayColor: 'red',
  },
  loginBtnView: {
    top: 15,
    width: 300,
    padding: 13,
    borderRadius: 10,
    // borderWidth: 0.2,
  },
  loginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
