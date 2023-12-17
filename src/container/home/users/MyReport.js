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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK} from '../../../constants/color';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
const MyRequest = ({navigation}) => {
  const user = useSelector(state => state.authReducer.user);
  // console.log('User in Req--->>', user?.Request?.VenderInfo?.ReportStatus);
  const [vebdorArr, setVebdorArr] = useState();
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  AntDesign.loadFont();
  Ionicons.loadFont();

  var VendorArr = [];
  useEffect(() => {
    // console.log(user?.Request?.ReportStatus);
    fecthVendorLIst();
    // if (user?.Request) {
    //   fecthVendorLIst();
    // } else {
    //   alert('No Report found');
    //   // navigation.goBack();
    // }
  }, []);
  const MakeCall = value => {
    Linking.openURL(`tel:${value}`);
    console.log(value);
  };
  // console.log(user?.RequestStatus);
  const fecthVendorLIst = async () => {
    const MyVendores = await firestore()
      .collection('orders')
      .doc(user?.OrderId)
      .get();
    console.log(MyVendores?.data()?.Order.orderStatus);
    if (!MyVendores?.data()?.Order) {
      setError(true);
      setLoading(false);
    } else {
      VendorArr.push({
        ...MyVendores?.data()?.Order,
        messageIconName: 'phone',
        CallIconName: 'eyeo',
        uri: require('../../../assets/img/Vendor.png'),
        onPressForCall: () => {
          navigation.navigate('ViewReport', {paramKey: 1});
        },
        onPressForMess: () => {
          MakeCall(`${MyVendores.data().Order.vendorInfo.PhoneNo}`);
        },
        // ReportStatus: MyVendores?.data()?.Order.orderStatus,
      });
      // console.log(VendorArr);
      setError(false);

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
    calliconUri,
    onPressForCall,
    onPressForMess,
    messageiconUri,
    ReportStatus,
  }) => (
    <View style={styles.item}>
      <Image source={uri} style={styles.img} />
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={[styles.name, {color: BLACK}]}>{title}</Text>
        <Text style={[styles.Addres, {color: BLACK}]}>{Addres}</Text>
        <Text style={[styles.Addres, {color: BLACK}]}>{ReportStatus}</Text>
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
  );

  const renderItem = ({item}) => (
    <Item
      title={item?.vendorInfo?.Name}
      Addres={item?.time}
      uri={item?.uri}
      calliconUri={item?.CallIconName}
      messageiconUri={item.messageIconName}
      onPressForCall={item.onPressForCall}
      onPressForMess={item.onPressForMess}
      ReportStatus={item.orderStatus}
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
        <Text style={{fontSize: 20, color: BLACK, left: 130}}>Reports</Text>

        <Image
          style={{height: 60, width: 60, left: 210, bottom: 10}}
          source={require('../../../assets/img/logo.png')}
        />
      </View>
      {Loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View>
          <Text style={{color: 'grey', fontWeight: '700', textAlign: 'center'}}>
            {Error ? 'No Report found' : ' Here are Your Reports'}
          </Text>
          {Error ? (
            <View />
          ) : (
            <FlatList
              data={vebdorArr}
              renderItem={renderItem}
              keyExtractor={item => item.UID}
            />
          )}
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
  },
  img: {
    height: 80,
    width: 70,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BLACK,
  },
  iconView: {flexDirection: 'row', justifyContent: 'space-between', left: 35},
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
