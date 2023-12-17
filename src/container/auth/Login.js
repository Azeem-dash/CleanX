import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
// import {LoginValidate} from '../Auth/LoginValidate';
import auth from '@react-native-firebase/auth';
// import {useDispatch} from 'react-redux';
// import {GetUserInfo} from '../redux/action/GetUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, SetType} from '../../../src/redux/actions/authentication';
import {BLACK} from '../../constants/color';
// import SetType from '../../redux/actions';
export default function Login({navigation, route}) {
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState();
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState();
  const [isSelected, setSelection] = useState(false);
  const [PwsdIcon, setPwsdIcon] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [status, setStatus] = useState();
  // console.log(route.params.paramKey);
  // const dispatch = useDispatch();
  // data = {
  //   email: Email,
  //   password: Password,
  // };
  const dispatch = useDispatch();
  FontAwesome.loadFont();
  AntDesign.loadFont();
  // ----------------------------------------------------------
  const LoginValidate = () => {
    const EmailString =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = EmailString.test(String(Email).toLowerCase());
    const passwordString = /^[A-Za-z]\w{7,14}$/;
    const validPassword = passwordString.test(Password);
    console.log(validEmail);

    // ------------validation for Email-----------
    if (route.params.paramKey === 0) {
      return true;
    } else if (Email == '') {
      setEmailError(' Email could be empty!');
    } else if (validEmail != true) {
      setEmailError('Please Enter the correct email');
    } else if (Password == '') {
      setPasswordError(' Password could not be empty!');
    } else if (validPassword != true) {
      setPasswordError('Please Enter the correct Password');
    } else {
      return true;
    }
    // ---------------------------------------------------------
  };
  useEffect(() => {
    if (route.params.paramKey === 0) {
      setStatus('vendor');
    } else {
      setStatus('users');
    }
  }, [status]);
  function Validate() {
    if (LoginValidate() == true) {
      // console.log('login');
      setIndicator(true);
      auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(user => {
          // console.log(user.user.uid);
          firestore()
            .collection(status)
            .doc(user.user.uid)
            .onSnapshot(async result => {
              // console.log('USER UPDATED');
              await AsyncStorage.setItem('LoginStatus', status);
              dispatch(SetType(status));
              if (result) {
                if (result?.exists === false) {
                  auth().signOut();
                }
                // console.log('good');
                // Alert.alert(
                //   'Terms and Conditions',
                //   'Do You Agree with term and condition?',
                //   [
                //     {
                //       text: 'cancel',
                //       onPress: () => console.log('Cancel Pressed'),
                //       style: 'cancel 🚫',
                //     },
                //     {
                //       text: 'Agreed 👍',
                //       onPress: () => console.log('OK Pressed'),
                //     },
                //   ],
                // );
                // await AsyncStorage.setItem('LoginStatus', status);
                // dispatch(SetType(status));
                dispatch(setUser({...result.data(), id: user.user.uid}));
              } else {
                dispatch(setUser(null));
              }
            });
        })
        .catch(error => {
          setIndicator(false);
          alert('Email/Password dose not exist, Please SignUp and Login Agian');
          console.log(error);
        });
    }
  }
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <AntDesign
            onPress={() => navigation.goBack()}
            style={{
              top: 40,
              marginLeft: 10,
              color: 'green',
              position: 'absolute',
            }}
            name="arrowleft"
            size={28}
          />
          <Image
            style={{height: 200, width: 200, alignSelf: 'center'}}
            source={require('../../assets/img/logo.png')}
          />
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              style={{top: 45, color: 'green', position: 'absolute'}}
              name="mail"
              size={25}
            />
            <TextInput
              autoFocus={true}
              label="Email"
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
              placeholderTextColor={'green'}
              placeholder="Enter Your Email"
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType={'email-address'}
              onChange={setSelection}
              // onFocus={setEmailError('')}
              // onChangeText={() => {
              //   setEmailError('');
              // }}
            />
          </View>
          <View>
            <Text style={styles.error}>{EmailError}</Text>
          </View>
          {/* ----------------------Password Input Field----------- */}
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              style={{top: 45, color: 'green', position: 'absolute'}}
              name="lock"
              size={25}
            />
            <TextInput
              theme={{
                colors: {
                  primary: 'green',
                  underlineColor: 'grey',
                  background: 'transparent',
                },
              }}
              underlineColor="transparent"
              label="Password"
              style={styles.Input}
              secureTextEntry={PwsdIcon ? false : true}
              placeholder="Enter Your Password"
              onChangeText={text => {
                setPassword(text), setPasswordError('');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setPwsdIcon(true);
                if (PwsdIcon == true) {
                  setPwsdIcon(false);
                }
              }}>
              <Button
                theme={{
                  colors: {
                    primary: 'grey',
                  },
                }}
                // fontSize={20}
                style={styles.hidebtn}
                icon={{
                  uri:
                    PwsdIcon === false
                      ? 'https://tutorialscapital.com/wp-content/uploads/2017/10/hide.png'
                      : 'https://tutorialscapital.com/wp-content/uploads/2017/10/view.png',
                }}></Button>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.error}>{PasswordError}</Text>
          </View>
          {/* --------------------Buttons--------------- */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.BtnView}>
              <TouchableOpacity
                disabled={!isSelected}
                onPress={() => Validate()}
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
                          color: isSelected ? '#ffffff' : 'black',
                          // color: indicator ? 'black' : 'black',
                        },
                      ]}>
                      Login
                    </Text>
                    <AntDesign
                      style={{
                        color: isSelected ? '#ffffff' : 'green',
                        position: 'absolute',
                        alignSelf: 'center',
                        right: 85,
                      }}
                      name="login"
                      size={25}
                    />
                  </View>
                )}
              </TouchableOpacity>

              {/* <Text style={{color: 'grey', padding: 5}}>Or</Text>
        <TouchableOpacity style={styles.FacebookBtnView}>
          <Text style={styles.FacebookBtn}>Login With Facebook</Text>
        </TouchableOpacity> */}
            </View>
            {route.params.paramKey === 1 ? (
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{color: BLACK}}>New here? </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SignUp1', {
                      paramKey: 0,
                    })
                  }
                  activeOpacity={1}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    Create an Account
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // lable: {
  //   color: 'grey',
  //   padding: 10,
  // },
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
  BtnView: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnView: {
    // backgroundColor: 'green',
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
  },
  FacebookBtnView: {
    width: 300,
    padding: 13,
    borderWidth: 0.2,
    borderRadius: 10,
  },
  FacebookBtn: {
    textAlign: 'center',
    padding: 5,
    borderWidth: 0.1,
  },
  hidebtn: {
    fontSize: 21,
    width: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
    right: 60,
    top: 40,
  },
  error: {
    color: 'red',
    left: 150,
  },
});
