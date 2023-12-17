import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../../../constants/index';
import {BLACK, WHITE} from '../../../constants/color';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
export default function ViewRequest({navigation}) {
  const [ImgUri, setImgUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = useSelector(state => state.authReducer.user);
  // console.log(user.Request.VenderInfo.id);
  useEffect(() => {
    // console.log(user.Request.photoUri);
    // fecthData();
  }, []);
  const fecthData = async () => {
    const url = await storage().ref(user?.Request?.photoUri).getDownloadURL();
    setLoading(false);
    setImgUri(url);
    // console.log(url);
  };
  const {theme, myColors, changeTheme} = useContext(ThemeContext.ThemeContext);
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  return (
    <View style={Styles.container}>
      {loading ? (
        <ActivityIndicator style={Styles.headImg} size="large" color="green" />
      ) : (
        <Image style={Styles.headImg} source={{uri: ImgUri}} />
      )}
      {/* <Text style={Styles.ViewRequestText}>ViewRequest to</Text> */}
      <View style={Styles.rowView}>
        <Image
          style={Styles.logoImg}
          source={require('../../../assets/img/Vendor.png')}
        />
        {/* <View style={{flexDirection: 'column'}}>
          <Text style={Styles.WelcomlogoText}>
            {user?.Request?.VenderInfo?.Name}
          </Text>
          <Text style={Styles.email}>{user?.Request?.VenderInfo?.Email}</Text>
          <Text style={Styles.time}>{user?.Request?.time}</Text>
          <Text style={Styles.time}>{user?.Request.Address}</Text>
        </View> */}
      </View>
      <Text
        style={{
          bottom: 100,
          color: BLACK,
          fontWeight: '600',
          fontSize: 25,
          right: 120,
        }}>
        Discription
      </Text>
      <Text style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
        {/* {user.Request.detial} */}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: BLACK,
            bottom: 60,
            right: 5,
            fontSize: 20,
            fontWeight: '400',
          }}>
          Status:
        </Text>
        <Text
          style={{color: BLACK, bottom: 60, fontSize: 20, fontWeight: '700'}}>
          {/* {user?.RequestStatus} */}
        </Text>
      </View>
      <View style={Styles.BtnView}>
        <TouchableOpacity
          style={Styles.ViewRequestloginBtnView}
          onPress={() => navigation.navigate('Home')}>
          <Text style={Styles.ViewRequestloginBtn}>Done!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.SignUpBtnView}
          onPress={() => navigation.goBack()}>
          <Text style={Styles.SignUpBtn}>Cancle</Text>
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
    bottom: 100,
    height: 200,
    width: 200,
    margin: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  logoImg: {
    height: 100,
    width: 100,
    bottom: 100,
    right: 70,
    borderWidth: 1,
    borderColor: BLACK,
    borderRadius: 10,
    // left: 1,
  },
  rowView: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 90,
  },
  WelcomlogoText: {
    color: '#5da552',
    bottom: 110,
    right: 65,
    fontWeight: 'bold',
    fontSize: 25,
  },
  Text: {
    bottom: 90,
    borderWidth: 1,
    //     right: 10,
    padding: 10,
  },
  BtnView: {
    padding: 10,
    bottom: 40,
    flexDirection: 'row',
  },
  ViewRequestloginBtnView: {
    backgroundColor: '#5da552',
    width: 100,
    padding: 13,
    borderRadius: 10,
    margin: 10,
  },
  ViewRequestloginBtn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
  SignUpBtnView: {
    width: 100,
    padding: 13,
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    borderColor: 'grey',
    // top: 10,
    margin: 10,
  },
  SignUpBtn: {
    textAlign: 'center',
    padding: 5,
    color: BLACK,
  },
  email: {
    color: BLACK,
    bottom: 100,
    right: 65,
    fontWeight: '500',
    fontSize: 19,
  },
  time: {
    color: BLACK,
    bottom: 90,
    right: 65,
    fontWeight: '500',
    fontSize: 19,
  },
});
