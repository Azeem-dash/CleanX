import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK} from '../../../constants/color';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
const ShowVendors = ({navigation}) => {
  const [vebdorArr, setVebdorArr] = useState();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState();
  AntDesign.loadFont();
  Ionicons.loadFont();
  const user = useSelector(state => state.authReducer.user);

  // let phoneNumber = '+1234567890';
  // const MakeCall = value => {
  //   Linking.openURL(`tel:${value}`);
  //   console.log(value);
  // };
  var VendorArr = [];
  useEffect(() => {
    if (user?.OrderId) {
      CheckID();
    }
    fecthVendorLIst();
  }, []);
  let OrderArr = [];
  const CheckID = async () => {
    setLoading(true);
    const MyVendores = await firestore()
      .collection('orders')
      .doc(user?.OrderId)
      .get();
    console.log('--', MyVendores.data()?.OrderArr);
    OrderArr.push(MyVendores.data()?.OrderArr);
    // console.log('MyVendores.data()?.Order-> ', MyVendores.data()?.OrderArr);
    // OrderArr.forEach(e => {
    //   console.log(e);
    // });
    // if (
    //   MyVendores.data()?.Order?.vendorInfo?.UID === route.params.paramKey.UID
    // ) {
    //   setLoading(false);
    //   alert(
    //     `You Cannot sent more then one report to this vendor. Your report is already sent to ${Name} `,
    //   );
    // } else {
    //   setLoading(false);
    //   //     console.log(MyVendores.data().Order.id);
    //   navigation.navigate('Message', {
    //     paramKey: route.params.paramKey,
    //   });
    // }

    //     console.log(MyVendores.data().Order.vendorInfo.UID);
    // console.log('OrderArr', OrderArr);
  };
  const fecthVendorLIst = async () => {
    setLoading(true);
    const AllVendores = firestore().collection('vendor');
    const allCapitalsRes = await AllVendores.get();
    if (allCapitalsRes.empty) {
      // alert('No Vendor available.');
      console.log('No Vendor available.');
      setLoading(false);
      return;
    } else {
      setLoading(false);
    }
    allCapitalsRes.forEach(doc => {
      // console.log(doc.data());
      setData(doc.data());
      VendorArr.push({
        data: doc.data(),
        CallIconName: 'phone',
        messageIconName: 'message1',
        uri: require('../../../assets/img/Vendor.png'),

        onPressForData: () => {
          navigation.navigate('VendorProfile', {
            paramKey: doc.data(),
            OrderArr: OrderArr,
          });
        },
        // onPressForCall: () => {
        //   MakeCall(`${doc.data().PhoneNo}`);
        // },
      });

      // VendorArr.push(doc.data());
      // console.log(doc.id, '=>', doc.data());
    });

    // console.log(VendorArr);
    setVebdorArr(VendorArr);
  };
  const imageUrl = 'https://giphy.com/gifs/world-globe-UOdoMz3baCENO';
  // const imageUrl = 'https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif';

  const Item = ({
    title,
    Addres,
    uri,
    calliconUri,
    messageiconUri,
    onPressForCall,
    onPressForMess,
    onPressForData,
  }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPressForData}>
      <View style={styles.item}>
        <Image source={uri} style={styles.img} />
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={[styles.name, {color: BLACK}]}>{title}</Text>
          <Text style={[styles.Addres, {color: BLACK}]}>{Addres}</Text>
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
      title={item.data.Name}
      Addres={item.data.Addres}
      uri={item.uri}
      onPressForData={item.onPressForData}
      calliconUri={item.CallIconName}
      messageiconUri={item.messageIconName}
      onPressForCall={item.onPressForCall}
      onPressForMess={item.onPressForMess}
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
        <Text style={{fontSize: 20, color: BLACK, left: 130}}>Vendor</Text>

        <Image
          style={{height: 60, width: 60, left: 220, bottom: 10}}
          source={require('../../../assets/img/logo.png')}
        />
      </View>
      {Loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View>
          <Text style={{color: 'grey', fontWeight: '700', textAlign: 'center'}}>
            {vebdorArr ? ' Here are List of Vendors' : 'No Vendor available.'}
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
  title: {fontSize: 20, textAlign: 'center', color: BLACK, bottom: 30},

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
  img: {height: 80, width: 70, padding: 10, borderRadius: 15},
  iconView: {flexDirection: 'row', justifyContent: 'space-between'},
  iconInner: {
    margin: 10,
    backgroundColor: '#76ae01',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#ffff',
  },
});

export default ShowVendors;
