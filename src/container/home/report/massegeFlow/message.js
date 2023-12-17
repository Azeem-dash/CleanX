import React, {useState, useEffect} from 'react';
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
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicatorBase,
} from 'react-native';
import Axios from 'axios';
import {TextInput, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from '../../../../constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BLACK} from '../../../../constants/color';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;
const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;
export default function PhoneNo({navigation, route}) {
  let VendroName = route?.params?.paramKey?.Name;
  // console.log(VendroName);

  let VendorId = route.params.paramKey.UID;
  const user = useSelector(state => state.authReducer.user);
  // console.log(user);
  const [Dis, addDis] = useState();
  const [visible, setVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [ImgUri, setImgUri] = useState('');
  const [LoadingPhoto, setLoadingPhoto] = useState();
  const [Address, setAddress] = useState();
  const [PhoneNo, setPhoneNo] = useState();
  var myHeaders = new Headers();

  myHeaders.append('x-as-apikey', '028617bf-91f8-4dc8-9dd2-7e96f4687d3d');
  myHeaders.append('Content-Type', 'application/json');
  AntDesign.loadFont();
  Entypo.loadFont();
  Ionicons.loadFont();
  FontAwesome.loadFont();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await Axios.get('https://ipinfo.io');
      // console.log(response.data.city);
      // console.log(response.data.region);
      console.log(route.params.paramKey.UID);
      setAddress(response.data.city + response.data.region);
      // ...
    }
    fetchData();
  }, [user]);
  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'App needs camera permission',
  //         },
  //       );
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else return true;
  // };

  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission',
  //         },
  //       );
  //       // If WRITE_EXTERNAL_STORAGE Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       alert('Write permission err', err);
  //     }
  //     return false;
  //   } else return true;
  // };

  // const captureImage = async type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   let isCameraPermitted = await requestCameraPermission();
  //   let isStoragePermitted = await requestExternalWritePermission();
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, response => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         alert('Image not added! ');
  //         return;
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode == 'permission') {
  //         alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode == 'others') {
  //         alert(response.errorMessage);
  //         return;
  //       }
  //       // console.log('base64 -> ', response.base64);
  //       // console.log('uri -> ', response.uri);
  //       // console.log('width -> ', response.width);
  //       // console.log('height -> ', response.height);
  //       // console.log('fileSize -> ', response.fileSize);
  //       // console.log('type -> ', response.type);
  //       // console.log('fileName -> ', response.fileName);
  //       // setFilePath(response);
  //     });
  //   }
  // };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    setLoadingPhoto(true);

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        setLoadingPhoto(false);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        setLoadingPhoto(false);

        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        setLoadingPhoto(false);

        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        setLoadingPhoto(false);

        return;
      }
      // console.log('Response = ', response?.assets);
      response?.assets.forEach(e => {
        setLoadingPhoto(false);

        console.log('base64 -> ', e.base64);
        console.log('uri -> ', e.uri);
        setImgUri(e.uri);
        console.log('width -> ', e.width);
        console.log('height -> ', e.height);
        console.log('fileSize -> ', e.fileSize);
        console.log('type -> ', e.type);
        console.log('fileName -> ', e.fileName);
      });

      // setFilePath(response);
    });
  };
  // console.log('Response. ', VendorId);
  const UploadFile = async () => {
    let OrderId = uuid.v4();
    if (PhoneNo == '' || ImgUri == '' || Dis == '') {
      alert('All Field is mandatory!');
    } else if (PhoneNo[0] != 0 || PhoneNo[1] != 3 || !PhoneNo.length === 11) {
      alert(`Please Enter Valid 11 digits Phone No. \n eg: 03*********`);
    } else {
      var today = new Date();
      var Ndate =
        today.getDate() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getFullYear();
      var time = today.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
        minute: '2-digit',
      });
      var dateTime = Ndate + ' | ' + time;
      setIndicator(true);
      const ImgUrL = ImgUri;
      let fileName = ImgUrL.substring(ImgUrL.lastIndexOf('/') + 1);
      try {
        await storage().ref(fileName).putFile(ImgUrL);
        firestore()
          .collection('orders')
          .doc(OrderId)
          .set({
            Order: {
              id: OrderId,
              userInfo: user,
              photoUri: fileName,
              time: dateTime,
              orderStatus: 'pending',
              vendorInfo: route.params.paramKey,
            },

            // Report: {
            //   userInfo: user,
            //   photoUri: fileName,
            //   detial: Dis,
            //   time: dateTime,
            //   Address: Address,
            //   PhoneNo: PhoneNo,
            // },
            // ReportStatus: 'pending',
          })
          .then(() => {
            firestore()
              .collection('users')
              .doc(user.id)
              .update({
                OrderId: OrderId,
                // Request: {
                //   VenderInfo: route.params.paramKey,
                //   photoUri: fileName,
                //   detial: Dis,
                //   time: dateTime,
                //   Address: Address,
                //   PhoneNo: PhoneNo,
                // },
                // RequestStatus: 'pending',
              })
              .then(() => {
                firestore()
                  .collection('vendor')
                  .doc(route.params.paramKey.UID)
                  .update({
                    OrderId: OrderId,
                    // Request: {
                    //   VenderInfo: route.params.paramKey,
                    //   photoUri: fileName,
                    //   detial: Dis,
                    //   time: dateTime,
                    //   Address: Address,
                    //   PhoneNo: PhoneNo,
                    // },
                    // RequestStatus: 'pending',
                  });
              })
              .then(e => {
                setIndicator(false);
                console.log('uploaded!');
                alert('Report Submited successfully!');
                navigation.navigate('Home');
              });
          });
      } catch (e) {
        console.log(e);
        setIndicator(false);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={'position'}

        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {/* <SafeAreaView style={{backgroundColor: 'red'}}> */}
        <SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              style={{left: 10}}
              onPress={() => navigation.goBack()}
              name={'arrowleft'}
              size={30}
              color={'green'}
            />
            <Text style={{fontSize: 20, color: BLACK, left: 110}}>
              Sent Report
            </Text>

            <Image
              style={{height: 60, width: 60, left: 190, bottom: 10}}
              source={require('../../../../assets/img/logo.png')}
            />
          </View>
          <Text style={{marginLeft: 15, color: BLACK}}>
            <Text style={{color: 'red'}}> *</Text> Add Current Photo of your
            report
          </Text>
          {/* <Text style={{color: 'grey', fontWeight: '700'}}>
            Add Information about your report
          </Text> */}
          <View style={styles.imgiewcontainer}>
            {LoadingPhoto ? (
              <ActivityIndicator size="large" color="green" />
            ) : ImgUri ? (
              <Image source={{uri: ImgUri}} style={styles.imageStyle} />
            ) : (
              <View style={[styles.imageStyle, {justifyContent: 'center'}]}>
                <View style={{flexDirection: 'column', margin: 20}}>
                  <Entypo
                    onPress={() => chooseFile('photo')}
                    style={{color: 'green', left: 6}}
                    name="images"
                    size={35}
                  />
                  <Text style={styles.textStyle}>Add</Text>
                </View>
              </View>
            )}

            <View style={{flexDirection: 'row'}}></View>
          </View>

          <Text style={{marginLeft: 15, marginTop: 10, color: BLACK}}>
            <Text style={{color: 'red'}}> *</Text> Enter Your Mobile Number
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* {visible ? (
            <Text style={{position: 'absolute', top: 46, fontSize: 16}}>
              +92
            </Text>
          ) : null} */}
            <TextInput
              //     label="Add Additional information"
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
              placeholder="Enter here!"
              onChangeText={text => setPhoneNo(text)}
              keyboardType={'number-pad'}
              onFocus={() => setVisible(true)}
              //     onBlur={() => setVisible(false)}
              onChange={setSelection}
              // multiline={true}
              // numberOfLines={6}
            />
            <Ionicons
              style={{top: 45, color: 'green'}}
              name="information-circle-outline"
              size={25}
            />
          </View>
          <Text style={{marginLeft: 15, marginTop: 10, color: BLACK}}>
            <Text style={{color: 'red'}}> *</Text> Add Title and Description of
            your report
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* {visible ? (
            <Text style={{position: 'absolute', top: 46, fontSize: 16}}>
              +92
            </Text>
          ) : null} */}
            <TextInput
              //     label="Add Additional information"
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
              placeholder="Enter here!"
              onChangeText={text => addDis(text)}
              keyboardType={'default'}
              onFocus={() => setVisible(true)}
              //     onBlur={() => setVisible(false)}
              onChange={setSelection}
              multiline={true}
              numberOfLines={6}
            />
            <Ionicons
              style={{top: 45, color: 'green'}}
              name="information-circle-outline"
              size={25}
            />
          </View>
          {indicator ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <TouchableOpacity
              // disabled={!isSelected}
              // onPress={() => navigation.goBack()}
              onPress={() => {
                UploadFile();
              }}
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
              <View>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: isSelected ? '#ffffff' : 'grey',
                      // color: indicator ? 'black' : 'black',
                    },
                  ]}>
                  Sent to {VendroName} !
                </Text>
                <FontAwesome
                  style={{
                    color: isSelected ? '#ffffff' : 'grey',
                    position: 'absolute',
                    alignSelf: 'center',
                    right: 10,
                    top: 2,
                  }}
                  name="send-o"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
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
  title: {textAlign: 'center', fontSize: 20, color: BLACK},
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
    //     backgroundColor: 'red',
    borderBottomWidth: 1,
    padding: 10,
    width: Platform.OS == 'ios' ? 350 : 325,
    left: 10,
    right: 10,
    // fontSize: 18,
    height: HEIGHT * 7,
    // background: 'transparent',
    // overlayColor: 'red',
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
  imgiewcontainer: {
    //     flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    //     padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 100,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
  },
});
