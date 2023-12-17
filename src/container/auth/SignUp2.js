import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {DateAuth} from '../auth/SignUpValidate';
import firestore from '@react-native-firebase/firestore';
// import {GetUserInfo} from '../redux/action/GetUser';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SignUp2({navigation, route}) {
  const dispatch = useDispatch();
  // const currentState = useSelector(state => state.UserValid);
  // console.log(currentState);
  console.log(route.params.DOB);
  const [isSelected, setSelection] = useState(false);

  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [PwsdIcon, setPwsdIcon] = useState(false);
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState();
  const [Name, setName] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [FnameErrror, setFnameErrror] = useState();
  const [KeyBordView, setKeyBordView] = useState(false);
  const [Dob, setDob] = useState({
    error: false,
    errorText: '',
    value: '',
    show: false,
    filled: false,
  });
  AntDesign.loadFont();

  // const currentState = useSelector(state => state.UserValid);
  //   const LoginValidate = () => {
  //     const EmailString =
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     const validEmail = EmailString.test(String(Email).toLowerCase());
  //     const passwordString = /^[A-Za-z]\w{7,14}$/;
  //     const validPassword = passwordString.test(Password);
  //     const nameString = /^[a-zA-Z]+ [a-zA-Z]+$/;
  //     const validName = nameString.test(Name);
  //     console.log(validName);
  //     // ------------validation for SignUp-----------
  //     if (Name == '') {
  //       setFnameErrror('Name Filed is Empty');
  //     } else if (validName == false) {
  //       setFnameErrror('Enter Valid Name');
  //     } else if (Email == '') {
  //       setEmailError('Please Enter your Email !');
  //     } else if (validEmail != true) {
  //       setEmailError('Please Enter valid email !');
  //     } else if (Password == '') {
  //       setEmailError(null);
  //       setPasswordError('Please Enter your password !');
  //     } else if (validPassword != true) {
  //       setPasswordError('Please Enter Strong Password !');
  //     } else {
  //       setPasswordError(null);

  //       return true;
  //     }
  //     // ---------------------------------------------------------
  //   };

  // const SignUpAuth = () => {
  //   const nameString = /^[a-zA-Z]+ [a-zA-Z]+$/;
  //   const validName = nameString.test(Name);
  //   console.log(validName);
  //   if (Name == '') {
  //     setFnameErrror('Name Filed is Empty');
  //   } else if (validName == false) {
  //     setFnameErrror('Enter Valid Name');
  //   }
  //   {
  //     setFnameErrror(null);
  //     return true;
  //   }
  // };
  // function Validate() {
  //   if (LoginValidate(data) == true) {
  // dispatch(GetUserValid({Email, Password}));
  //   }
  // }

  // data = {
  //   email: currentState.Email,
  //   password: currentState.Password,
  // };

  const SignUp = async () => {
    // console.log('Current->', currentState);
    //     let val = 3;
    // if (SignUpAuth() == true) {

    //     if (LoginValidate() == true) {
    //       dispatch(GetUserValid(val));

    setIndicator(true);
    await auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(user => {
        console.log(user.user.uid);
        firestore()
          .collection('users')
          .doc(user.user.uid)
          .set({
            // status: 'User',
            Email: route.params.Email,
            Name: route.params.Name,
            DOB: route.params.DOB,
            Phone: Phone,
            Address: Address,
          })
          .then(() => {
            // Alert.alert(
            //   'Terms and Conditions',
            //   'Do You Agree with term and condition?',
            //   [
            //     {
            //       text: 'cancel',
            //       onPress: () => console.log('Cancel Pressed'),
            //       style: 'cancel',
            //     },
            //     {
            //       text: 'Agreed',
            //       onPress: () => console.log('OK Pressed'),
            //     },
            //   ],
            // );
            console.log('signup');
          });
      })
      .catch(error => {
        setIndicator(false);
        alert('failed due to : ' + error);
        console.log(error);
        //   dispatch(GetUserValid({Email: null}));
      });
  };
  // }
  //   }
  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          enabled={KeyBordView ? true : false}
          // behavior={KeyBordView ? 'position' : false}
          behavior={'position'}

          // keyboardVerticalOffset={keyboardVerticalOffset}
        >
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
          <ScrollView keyboardDismissMode={'on-drag'}>
            {/* -------------Phone No--------------- */}
            <View>
              <AntDesign
                style={{top: 45, color: 'green', position: 'absolute'}}
                name="phone"
                size={25}
              />
              <TextInput
                autoFocus={true}
                underlineColor="transparent"
                label="Phone No"
                theme={{
                  colors: {
                    primary: 'green',
                    underlineColor: 'grey',
                    background: 'transparent',
                  },
                }}
                style={styles.Input}
                autoCapitalize={'none'}
                placeholder="Enter Your Phone Number"
                onChangeText={text => {
                  setPhone(text);
                  setFnameErrror('');
                }}
                onChange={setSelection}
              />
              <Text style={styles.error}>{FnameErrror}</Text>
            </View>
            {/* -------------Address--------------------------- */}
            <View>
              <AntDesign
                style={{top: 45, color: 'green', position: 'absolute'}}
                name="enviromento"
                size={25}
              />
              <TextInput
                underlineColor="transparent"
                label="Address"
                theme={{
                  colors: {
                    primary: 'green',
                    underlineColor: 'grey',
                    background: 'transparent',
                  },
                }}
                style={styles.Input}
                autoCapitalize={'none'}
                placeholder="Enter Your Home Address"
                onChange={setSelection}
                onChangeText={text => {
                  setAddress(text);
                  setEmailError('');
                }}
              />
              <View>
                <Text style={styles.error}>{EmailError}</Text>
              </View>
            </View>
            {/* -------------------------Password Field----------------- */}
            {/* <View style={{flexDirection: 'row'}}>
              <AntDesign
                style={{top: 45, color: 'green', position: 'absolute'}}
                name="lock"
                size={25}
              />
              <TextInput
                underlineColor="transparent"
                label="Password"
                theme={{
                  colors: {
                    primary: 'green',
                    underlineColor: 'grey',
                    background: 'transparent',
                  },
                }}
                style={styles.Input}
                secureTextEntry={PwsdIcon ? false : true}
                placeholder="Enter Your Password"
                onChangeText={text => {
                  setPassword(text), setPasswordError('');
                }}
                onChange={setSelection}
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
            </View> */}

            {/* -----------------------Date of birth----------------- */}
            {/* <View>
              <AntDesign
                style={{top: 45, color: 'green', position: 'absolute'}}
                name="calendar"
                size={25}
              />
              <TextInput
                underlineColor="transparent"
                label="Date of birth"
                theme={{
                  colors: {
                    primary: 'green',
                    underlineColor: 'grey',
                    background: 'transparent',
                  },
                }}
                onFocus={() => {
                  setKeyBordView(true);
                }}
                onBlur={() => {
                  setKeyBordView(false);
                  // Keyboard.dismiss;
                }}
                style={styles.Input}
                placeholder="MM/DD/YYYY"
                keyboardType={'number-pad'}
                maxLength={10}
                error={Dob.error}
                value={Dob.value}
                onChangeText={text => {
                  let date = DateAuth(text);

                  setDob({...Dob, value: date});
                  if (!(text.length < 10)) {
                    setDob({
                      ...Dob,
                      error: false,
                      errorText: '',
                      filled: true,
                      value: date,
                    });
                  } else {
                    setDob({
                      ...Dob,
                      filled: false,
                      value: date,
                    });
                  }
                }}
                onChange={setSelection}
              />
            </View> */}
            {/* ------------------  Button --------------- */}
            <View style={styles.BtnView}>
              <TouchableOpacity
                onPress={() => {
                  SignUp();
                  // navigation.navigate('SignUp2screen', {
                  //   paramKey: 3,
                  // });
                }}
                disabled={!isSelected}
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
                  <Text
                    style={[
                      styles.loginBtn,
                      {
                        color: isSelected ? '#ffffff' : 'black',
                        // color: indicator ? 'black' : 'black',
                      },
                    ]}>
                    Done
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            {/* <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text>Already member? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('login', {
                    paramKey: 0,
                  })
                }
                activeOpacity={1}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>Login</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  lable: {
    color: 'grey',
    padding: 10,
  },
  Input: {
    borderBottomWidth: 1,
    padding: 10,
    width: 350,
    left: 10,
    right: 10,

    height: 70,
  },
  BtnView: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnView: {
    width: 300,
    padding: 13,
    borderRadius: 10,
    borderWidth: 0.2,
  },
  loginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
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
  headerText: {
    textAlign: 'center',
    fontSize: 34,
  },
  lable: {
    color: 'grey',
    padding: 10,
  },
  Input: {
    borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
    width: 350,
    left: 10,
    right: 10,
  },
  BtnView: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnView: {
    width: 300,
    padding: 13,
    borderRadius: 10,
    // borderWidth: 0.2,
  },
  loginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
  FacebookBtnView: {
    width: 300,
    padding: 13,
  },
  FacebookBtn: {
    textAlign: 'center',
    padding: 5,
    borderWidth: 0.1,
  },
  NextBtnView: {
    width: 400,
    padding: 13,
  },
  NextBtn: {
    borderRadius: 10,
    borderWidth: 0.1,
    padding: 20,
    textAlign: 'center',
  },
  loginTab: {
    // borderColor: 'grey',
    padding: 10,
    width: 200,
    alignItems: 'center',
  },
  SignUpTab: {
    // borderColor: 'grey',
    padding: 10,
    width: 200,
    alignItems: 'center',
  },
});
