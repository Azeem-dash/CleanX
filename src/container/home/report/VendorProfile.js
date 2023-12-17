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
  Linking,
} from 'react-native';
import {ThemeContext} from '../../../constants/index';
import {BLACK, WHITE} from '../../../constants/color';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
export default function VendorProfile({navigation, route}) {
  //   const [ImgUri, setImgUri] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [confirmLoading, setConfirmLoading] = useState(false);
  const [Loading, setLoading] = useState();
  const [Name, setName] = useState(route.params.paramKey.Name);
  const [Address, setAddress] = useState(route.params.paramKey.Addres);
  const [email, setEmail] = useState(route.params.paramKey.Email);
  const [Age, setAge] = useState(route.params.paramKey.Age);
  const [Phone, setPhone] = useState(route.params.paramKey.PhoneNo);
  const user = useSelector(state => state.authReducer.user);
  const [ArrayElement, setArrayElement] = useState();
  console.log('OrderArr-> ', route.params.OrderArr);
  AntDesign.loadFont();
  MaterialCommunityIcons.loadFont();
  Entypo.loadFont();
  //     console.log(user.OrderId);
  //   order Id :1eff333a-3876-4f81-8e9d-747d48fda3d1
  useEffect(() => {
    // console.log(user.Request.photoUri);
    // fecthData();
  }, []);
  const CheckID = async () => {
    setLoading(true);
    const MyVendores = await firestore()
      .collection('orders')
      .doc(user?.OrderId)
      .get();

    console.log(MyVendores.data().Order.vendorInfo.Name);

    if (user?.OrderId) {
      setLoading(false);
      alert(
        `You Cannot sent more then one report. Your report is already sent to ${
          MyVendores.data().Order.vendorInfo.Name
        } `,
      );
    } else {
      setLoading(false);
      //     console.log(MyVendores.data().Order.id);
      navigation.navigate('Message', {
        paramKey: route.params.paramKey,
        OrderArr: route.params.OrderArr,
      });
    }

    //     console.log(MyVendores.data().Order.vendorInfo.UID);
  };
  // console.log('MyVendores.data().OrderArr[index]', ArrayElement);
  //   const fecthData = async () => {
  //     const url = await storage().ref(user?.Request?.photoUri).getDownloadURL();
  //     setLoading(false);
  //     setImgUri(url);
  //     // console.log(url);
  //   };
  const {theme, myColors, changeTheme} = useContext(ThemeContext.ThemeContext);
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const MakeCall = value => {
    Linking.openURL(`tel:${value}`);
    // console.log(value);
  };
  return (
    <View style={Styles.container}>
      <View style={{flexDirection: 'row', position: 'absolute', top: 50}}>
        <AntDesign
          style={{right: 70}}
          onPress={() => navigation.goBack()}
          name={'arrowleft'}
          size={30}
          color={'green'}
        />
        <Text style={{fontSize: 20, color: BLACK}}>Vendor Profile</Text>

        <Image
          style={{height: 60, width: 60, bottom: 15, left: 70}}
          source={require('../../../assets/img/logo.png')}
        />
      </View>
      {/* {loading ? (
        <ActivityIndicator style={Styles.headImg} size="large" color="green" />
      ) : (
        <Image style={Styles.headImg} source={{uri: ImgUri}} />
      )} */}
      {/* <Text style={Styles.ViewRequestText}>ViewRequest to</Text> */}
      <View
        style={{
          bottom: 100,
          justifyContent: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={Styles.logoImg}
          source={require('../../../assets/img/Vendor.png')}
        />
        <Text
          style={{
            //   bottom: 190,
            color: BLACK,
            fontWeight: '600',
            fontSize: 25,
            //   right: 120,
          }}>
          {Name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <AntDesign name="star" size={24} color="green" />
          <AntDesign name="star" size={24} color="green" />
          <AntDesign name="star" size={24} color="green" />
          <AntDesign name="staro" size={24} color="black" />
          <AntDesign name="staro" size={24} color="black" />
        </View>
      </View>

      <View
        style={{
          // backgroundColor: 'red',
          width: '100%',
        }}>
        <View style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
          <Entypo name="location-pin" size={30} color="black" />
          <Text style={{fontSize: 20, left: 10}}>{Address}</Text>
        </View>

        <View style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
          <Entypo name="email" size={30} color="black" />
          <Text style={{fontSize: 20, left: 10}}>{email}</Text>
        </View>

        <View style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
          <MaterialCommunityIcons name="face-outline" size={30} color="black" />
          <Text style={{fontSize: 20, left: 10}}>{Age} year</Text>
        </View>

        <View style={[Styles.Text, {color: theme == 'light' ? BLACK : WHITE}]}>
          <AntDesign name="phone" size={30} color="black" />
          <Text style={{fontSize: 20, left: 10}}>{Phone}</Text>
        </View>
      </View>

      <View style={Styles.BtnView}>
        {Loading ? (
          <ActivityIndicator size={'large'} color={'green'} />
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={Styles.MessageBtn}
            onPress={() => {
              CheckID();
            }}>
            <Text style={Styles.MessageBtnText}>Sent Report</Text>
            <AntDesign
              //       onPress={onPressForCall}
              //       style={styles.iconInner}
              name={'message1'}
              size={30}
              color={WHITE}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={1}
          style={Styles.CallBtn}
          onPress={() => {
            MakeCall(`${Phone}`);
          }}>
          <Text style={Styles.CallBtnText}>Call</Text>
          <AntDesign
            //       style={styles.iconInner}
            name={'phone'}
            size={30}
          />
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
    //     position: 'absolute',
    //     top: 0,
    //     bottom: 200,
    //     backgroundColor: 'red',
    //     right: 70,
    borderWidth: 1,
    borderColor: BLACK,
    borderRadius: 10,
    //     justifyContent: 'center',
    alignItems: 'center',
    //     alignContent: 'center',
    //     backgroundColor: 'red',
    // left: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 90,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  WelcomlogoText: {
    color: '#5da552',
    bottom: 110,
    right: 65,
    fontWeight: 'bold',
    fontSize: 25,
  },
  Text: {
    flexDirection: 'row',
    // bottom: 20,
    //     right: 10,
    //     borderWidth: 1,
    //     right: 10,
    fontSize: 25,
    padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
  },
  BtnView: {
    padding: 10,
    bottom: 40,
    flexDirection: 'row',
    position: 'absolute',
    //     backgroundColor: 'red',
    width: '100%',
    margin: 10,
    justifyContent: 'center',
    //     top: 0,
  },

  MessageBtn: {
    backgroundColor: '#5da552',
    width: 150,
    padding: 13,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CallBtn: {
    flexDirection: 'row',
    width: 150,
    //     height: 100,
    padding: 13,
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    borderColor: 'grey',
    // top: 10,
    margin: 10,
    justifyContent: 'center',
  },
  MessageBtnText: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
    // fontSize: 20,
    //     width: 100,
  },
  CallBtnText: {
    textAlign: 'center',
    padding: 5,
    color: BLACK,
    // fontSize: 20,
  },
  email: {
    color: BLACK,
    bottom: 100,
    right: 65,
    fontWeight: '500',
    // fontSize: 19,
  },
  time: {
    color: BLACK,
    bottom: 90,
    right: 65,
    fontWeight: '500',
    fontSize: 19,
  },
});
