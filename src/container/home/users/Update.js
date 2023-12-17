import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native';
import {BLACK} from '../../../constants/color';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';

export default function Profile({navigation}) {
  const [Name, setName] = useState();
  const [ImgUri, setImgUri] = useState('');
  const [LoadingPhoto, setLoadingPhoto] = useState();
  const [indicator, setIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  Entypo.loadFont();
  FontAwesome.loadFont();
  Feather.loadFont();
  IconAntDesign.loadFont();
  const user = useSelector(state => state.authReducer.user);
  console.log(user?.status);
  useEffect(() => {
    fecthData();
    setName(user?.Name);
  }, []);
  const fecthData = async () => {
    if (user?.UserProfileUri) {
      setLoading(true);
      const url = await storage().ref(user?.UserProfileUri).getDownloadURL();
      setImgUri(url);
      setLoading(false);
    } else if (user?.status == 'Vendor') {
      setImgUri('../../assets/img/Vendor.png');
      setLoading(false);
      setImgUri(null);
    } else {
      setImgUri('../../assets/img/profile.png');
    }

    // console.log(url);
  };
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
  const OnDone = async () => {
    try {
      if (ImgUri == '') {
        navigation.navigate('Home');
        alert('Photo could not be uploaded');
      } else {
        setIndicator(true);
        const ImgUrL = ImgUri;

        let fileName = ImgUrL.substring(ImgUrL.lastIndexOf('/') + 1);
        await storage().ref(fileName).putFile(ImgUrL);
        firestore()
          .collection('users')
          .doc(user.id)
          .update({
            UserProfileUri: fileName,
            Name: Name,
          })
          .then(e => {
            setIndicator(false);
            console.log('uploaded!');
            alert('Report Submited successfully!');
            navigation.navigate('Home');
          });
      }
    } catch (e) {
      console.log(e);
      setIndicator(false);
    }
  };
  return (
    <SafeAreaView
      style={{color: '#E5E5E5', flex: 1, justifyContent: 'space-between'}}>
      {/* --------------------Edit Button------------ */}
      <View>
        <View style={styles.headerView}>
          <IconAntDesign
            style={{color: 'green', padding: 5}}
            name="left"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{fontSize: 25, color: BLACK, right: 150}}>Setting</Text>
        </View>
        {/* -------------------------Profile View------------ */}
        <View style={styles.profileView}>
          {ImgUri ? (
            <Image source={{uri: ImgUri}} style={styles.profilePic} />
          ) : (
            <Image
              style={styles.profilePic}
              source={require('../../../assets/img/profile.png')}
            />
          )}

          <View style={styles.imgiewcontainer}>
            {LoadingPhoto ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <TouchableOpacity
                style={styles.ViewRequestloginBtnView}
                onPress={() => {
                  chooseFile('photo');
                }}>
                <Text style={styles.ViewRequestloginBtn}>Upload Profile +</Text>
              </TouchableOpacity>

              // <View style={[styles.imageStyle, {justifyContent: 'center'}]}>
              //   <View style={{flexDirection: 'column', margin: 20}}>
              //     <Entypo
              //       onPress={() => chooseFile('photo')}
              //       style={{color: 'green', left: 6}}
              //       name="images"
              //       size={35}
              //     />
              //     <Text style={styles.textStyle}>Add</Text>
              //   </View>
              // </View>
            )}

            <View style={{flexDirection: 'row'}}></View>
          </View>
          {/* <TouchableOpacity
            style={styles.ViewRequestloginBtnView}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.ViewRequestloginBtn}>Upload Profile +</Text>
          </TouchableOpacity> */}
          {/* <Text style={styles.head}>{user.Name}</Text> */}
        </View>

        {/* <TextInput placeholder={'ddd'} /> */}
        {/* <Text style={styles.Chead}>Name: </Text> */}
        <TextInput
          label="Name"
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
          placeholder="Enter Your Name"
          onChangeText={text => {
            setName(text);
          }}
          keyboardType={'default'}
          value={Name}
          // onChange={setSelection}
          // onFocus={setNameError('')}
          // onChangeText={() => {
          //   setNameError('');
          // }}
        />
        {indicator ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <TouchableOpacity style={styles.DoneView} onPress={() => OnDone()}>
            <Text style={styles.DoneBtn}>Done</Text>
          </TouchableOpacity>
        )}

        {/* <Text style={styles.underline}>{user.Email}</Text> */}
      </View>

      {/* --------------------Logout Button------------ */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  EditlogoutBtnView: {
    top: 130,
    width: 350,
    padding: 13,
    borderWidth: 0.2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  EditlogoutBtn: {
    color: '#ffff',
    padding: 5,
    left: 100,
  },
  underline: {
    textDecorationLine: 'underline',
    fontSize: 20,
    color: BLACK,
    top: 3,
  },

  head: {
    fontSize: 35,
    color: BLACK,
  },
  CheadView: {
    padding: 20,
  },
  Chead: {
    fontSize: 25,
    color: BLACK,
  },
  profileView: {
    top: 10,

    // alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: BLACK,
  },
  EditProfileBtnView: {
    // left: 5,
    // width: 150,
    padding: 10,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    // textAlign: 'center',
  },
  EditBtn: {
    // textAlign: 'center',
    padding: 5,
    // left: 100,
    // borderWidth: 0.1,
  },
  CView: {
    backgroundColor: '#d4ffda',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  ViewRequestloginBtnView: {
    backgroundColor: '#5da552',
    width: 120,
    padding: 3,
    borderRadius: 10,
    margin: 10,
  },
  ViewRequestloginBtn: {
    textAlign: 'center',
    color: 'white',
    // padding: 5,
  },
  DoneView: {
    backgroundColor: '#5da552',
    width: 120,
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignSelf: 'center',
  },
  DoneBtn: {
    textAlign: 'center',
    color: 'white',
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
  imgiewcontainer: {
    //     flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
  },
  textStyle: {
    //     padding: 10,
    color: 'black',
    textAlign: 'center',
  },
});
