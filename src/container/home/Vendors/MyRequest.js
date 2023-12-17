import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK} from '../../../constants/color';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const MyRequest = ({navigation}) => {
  const user = useSelector(state => state.authReducer.user);
  // console.log('User in Req--->>', user);
  const [vebdorArr, setVebdorArr] = useState();
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState();
  AntDesign.loadFont();
  Ionicons.loadFont();

  var VendorArr = [];
  useEffect(() => {
    fecthVendorLIst();
  }, []);
  const MakeCall = value => {
    Linking.openURL(`tel:${value}`);
    console.log(value);
  };
  const fecthVendorLIst = async () => {
    // console.log(...user?.Report.PhoneNo);
    const MyVendores = await firestore()
      .collection('orders')
      .doc(user?.OrderId)
      .get();
    console.log('MyVendores->', MyVendores?.data()?.Order?.orderStatus);
    console.log('MyVendores->', MyVendores?.data()?.Order?.time);

    if (!MyVendores?.data()?.Order) {
      setLoading(false);
      console.log('erroe');
      setError(true);
    } else {
      VendorArr.push({
        ...MyVendores?.data()?.Order?.userInfo,
        messageIconName: 'phone',
        CallIconName: 'eyeo',
        uri: require('../../../assets/img/profile.png'),
        onPressForCall: () => {
          navigation.navigate('ViewRequest', {paramKey: 1});
        },

        onPressForMess: () => {
          MakeCall(`${MyVendores?.data()?.Order?.orderStatus}`);
        },
        time: MyVendores?.data()?.Order?.time,
        status: MyVendores?.data()?.Order?.orderStatus,
        onPressForD: () => {
          navigation.navigate('ViewRequest', {
            paramKey: MyVendores?.data(),
            // OrderArr: OrderArr,
          });
        },
      });
      // console.log(VendorArr);
      setLoading(false);
      setVebdorArr(VendorArr);
    }
  };
  const imageUrl = 'https://giphy.com/gifs/world-globe-UOdoMz3baCENO';
  // const imageUrl = 'https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif';
  // console.log(vebdorArr);
  const Item = ({
    title,
    Addres,
    uri,
    onPressForD,
    calliconUri,
    messageiconUri,
    onPressForCall,
    onPressForMess,
    status,
  }) => (
    <TouchableOpacity onPress={onPressForD}>
      <View style={styles.item}>
        <Image source={uri} style={styles.img} />
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={[styles.name, {color: BLACK}]}>{title}</Text>
          <Text style={[styles.Addres, {color: BLACK}]}>{Addres}</Text>
          <Text style={[styles.Addres, {color: BLACK}]}>{status}</Text>
        </View>
        {/* <View
        style={{
          position: 'absolute',
          right: 10,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View style={styles.iconView}>
          <View style={{borderRadius: 10}}>
            <AntDesign
              onPress={onPressForCall}
              style={styles.iconInner}
              name={calliconUri}
              size={30}
            />
          </View>
          <AntDesign
            onPress={onPressForMess}
            style={styles.iconInner}
            name={messageiconUri}
            size={30}
          />
        </View>
      </View> */}
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      title={item?.Name}
      Addres={item?.time}
      uri={item?.uri}
      onPressForD={item.onPressForD}
      calliconUri={item.CallIconName}
      messageiconUri={item.messageIconName}
      onPressForCall={item.onPressForCall}
      onPressForMess={item.onPressForMess}
      status={item.status}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <AntDesign
          style={{left: 10}}
          onPress={() => navigation.goBack()}
          name={'arrowleft'}
          size={30}
          color={'green'}
        />
        <Text style={{fontSize: 20, color: BLACK, left: 120}}>My Request</Text>

        <Image
          style={{height: 60, width: 60, left: 180, bottom: 10}}
          source={require('../../../assets/img/logo.png')}
        />
      </View>
      {Loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View>
          <Text style={{color: 'grey', fontWeight: '700', textAlign: 'center'}}>
            {Error
              ? 'There is No pending work'
              : '   Here are Your pending work  '}
          </Text>
          <FlatList
            data={vebdorArr}
            renderItem={renderItem}
            keyExtractor={item => item.UID}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    //     backgroundColor: '#f9c2ff',
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    //     bottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    left: 15,
  },
  Addres: {
    fontSize: 14,
    left: 15,
    justifyContent: 'center',
  },
  img: {height: 80, width: 70, padding: 10, borderRadius: 15, borderWidth: 1},
  iconView: {flexDirection: 'row', justifyContent: 'space-between', left: 25},
  iconInner: {
    margin: 10,
    backgroundColor: '#76ae01',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#ffff',
  },
});

export default MyRequest;
