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
import {BLACK} from '../../constants/color';
import storage from '@react-native-firebase/storage';

export default function Profile({navigation}) {
  const [Edit, setEdit] = useState();
  const [ImgUri, setImgUri] = useState(null);
  const [loading, setLoading] = useState(false);

  FontAwesome.loadFont();
  Feather.loadFont();
  IconAntDesign.loadFont();
  const user = useSelector(state => state.authReducer.user);
  console.log(user?.UserProfileUri);
  // calculate_age(user.DOB);
  // function getAge(dateString) {
  //   var today = new Date();
  //   var birthDate = new Date(dateString);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   console.log(age);
  // }

  // };
  // function calculate_age(dob) {
  //   var diff_ms = Date.now() - dob.getTime();
  //   var age_dt = new Date(diff_ms);

  //   console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
  // }
  // const logout = () => {
  //   auth().signOut();
  // };
  // console.log(calculate_age(new Date(currentState.dob)));
  // let MyAge = calculate_age(new Date(currentState.dob));
  // console.log(MyAge);
  useEffect(() => {
    // console.log(user.Request.photoUri);
    fecthData();
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
      setLoading(false);
    }

    // console.log(url);
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
          <Text style={{fontSize: 25, color: BLACK}}>Profile</Text>
          {user?.status == 'Vendor' ? (
            <View />
          ) : (
            <TouchableOpacity
              style={styles.EditProfileBtnView}
              onPress={() => navigation.navigate('Update')}>
              {/* <Text style={styles.EditBtn}>Edit Profile</Text> */}
              <IconAntDesign
                // style={{left: 110, top: 3, color: 'grey'}}
                color={BLACK}
                name="edit"
                size={21}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* -------------------------Profile View------------ */}
        <View style={styles.profileView}>
          {loading ? (
            <ActivityIndicator
              style={styles.profilePic}
              size="large"
              color="green"
            />
          ) : (
            <Image
              style={styles.profilePic}
              source={
                user?.status == 'User' && user?.UserProfileUri
                  ? {uri: ImgUri}
                  : user?.status == 'Vendor'
                  ? require('../../assets/img/Vendor.png')
                  : require('../../assets/img/profile.png')
              }
            />
          )}

          <Text style={styles.head}>
            {/* {currentState.FName + ' ' + currentState.LName} */}
            {user?.Name}
          </Text>
        </View>
        <View style={styles.CheadView}>
          <View style={styles.CView}>
            <Text style={styles.Chead}>Email: </Text>
            <Text style={styles.underline}>{user?.Email}</Text>
          </View>
          <View style={styles.CView}>
            <Text style={styles.Chead}>Age:</Text>
            <Text style={styles.underline}>{user?.DOB || user?.Age}</Text>
          </View>
        </View>
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
    backgroundColor: '#90Ef99',
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
});
