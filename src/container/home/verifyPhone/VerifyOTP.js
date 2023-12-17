import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Touchable} from 'react-native';
const CELL_COUNT = 6;
const VerifyOTP = function ({
  route: {
    params: {phoneNumber, result},
  },
  navigation,
}) {
  AntDesign.loadFont();
  const dispatch = useDispatch();

  // const refCallback = textInputRef => node => {
  //   textInputRef.current = node;
  // };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isSelected, setSelection] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [response, setresponse] = useState(result);
  const user = auth().currentUser;
  console.log(user.uid);
  console.log(phoneNumber, ' $ ', response);
  var myHeadersOfGetOtp = new Headers();
  myHeadersOfGetOtp.append(
    'x-as-apikey',
    '028617bf-91f8-4dc8-9dd2-7e96f4687d3d',
  );
  myHeadersOfGetOtp.append('Content-Type', 'application/json');

  var rawOfOtp = JSON.stringify({
    messageFormat:
      'Welcome to CleanX App, this is your OTP ${otp}. Please do not share it with anyone',
    phoneNumber: `${phoneNumber}`,
    otpLength: 6,
    otpValidityInSeconds: 120,
  });

  var requestOptionsOfOtp = {
    method: 'POST',
    headers: myHeadersOfGetOtp,
    body: rawOfOtp,
    redirect: 'follow',
  };
  async function GetOtp() {
    setIndicator(true);

    await fetch('https://otp.apistack.run/v1/sendOtp', requestOptionsOfOtp)
      .then(response => response.clone().json())
      .then(result => {
        // console.log('result-->>', result),
        setIndicator(false), setresponse(result);
      })
      .catch(error => {
        console.log('error', error), setIndicator(false);
      });
  }
  // --------------------------------------------------------------------
  var myHeadersofCong = new Headers();
  myHeadersofCong.append('x-as-apikey', '028617bf-91f8-4dc8-9dd2-7e96f4687d3d');
  myHeadersofCong.append('Content-Type', 'application/json');

  var rawOfCong = JSON.stringify({
    requestId: !response.success ? null : response.data.requestId,
    otp: value,
  });

  var requestOptionsOfCong = {
    method: 'POST',
    headers: myHeadersofCong,
    body: rawOfCong,
    redirect: 'follow',
  };
  async function confirmCode() {
    setIndicator(true);
    await fetch('https://otp.apistack.run/v1/sendOtp', requestOptionsOfCong)
      .then(response => response.clone().json())
      .then(async result => {
        console.log('result in submittion-->>', result), setIndicator(false);

        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            Phone: phoneNumber,
            PhoneVarified: result.success,
          })
          .then(() => {
            //     dispatch(GetUserInfo());
            navigation.navigate('Home');
            if (result.success) {
              alert('congratulations! your number is Varified!');
            } else {
              alert(
                'Sorry! your number is not Varified yet Please try agian latter!',
              );
            }
          });
      })
      .catch(error => {
        console.log('error', error), setIndicator(false);
      });
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>OTP Verification</Text>
      <Image
        style={{height: 200, width: 200, alignSelf: 'center'}}
        source={require('../../../assets/img/logo.png')}
      />
      <Text style={{color: 'grey', fontWeight: '700'}}>
        Your OTP sent to this number {phoneNumber}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        onChange={setSelection}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity
        disabled={!isSelected}
        onPress={() => confirmCode()}
        style={[
          styles.loginBtnView,
          {
            backgroundColor: isSelected ? 'green' : '#ffffff',
            backgroundColor: indicator ? '#ffffff' : isSelected ? 'green' : '',
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
              Submit
            </Text>
            <AntDesign
              style={{
                color: isSelected ? '#ffffff' : 'grey',
                position: 'absolute',
                alignSelf: 'center',
                right: 71,
                top: 2,
              }}
              name="check"
              size={25}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            textAlign: 'center',
            top: 30,
            right: 3,
          }}>
          You not get OTP?
        </Text>
        <TouchableOpacity onPress={() => GetOtp()}>
          <Text
            style={{
              color: 'green',
              fontWeight: '700',
              textAlign: 'center',
              top: 30,
            }}>
            Resend
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            textAlign: 'center',
            top: 30,
            left: 3,
          }}>
          to "{phoneNumber}"
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    paddingTop: 130,
  },
  submitButtonText: {
    color: '#ffff',
  },
  otpText: {
    color: 'blue',
    fontSize: 18,
    width: '100%',
  },
  root: {flex: 1, top: 80, margin: 15},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  loginBtnView: {
    top: 15,
    width: 300,
    padding: 13,
    borderRadius: 10,
    alignSelf: 'center',
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

export default VerifyOTP;
