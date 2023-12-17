import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {BLACK, WHITE} from '../../constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import {useSelector, useDispatch} from 'react-redux';

export default function notification({navigation}) {
  FontAwesome.loadFont();
  AntDesign.loadFont();
  Entypo.loadFont();
  Feather.loadFont();
  MaterialIcons.loadFont();
  Ionicons.loadFont();
  MaterialCommunityIcons.loadFont();
  Octicons.loadFont();
  const isCarousel = React.useRef(null);
  const user = useSelector(state => state.authReducer.user);
  // console.log('User in Notification. ', user);
  const [Array, setArray] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    var Arr = [];
    if (user?.Report) {
      console.log('Vendor Screen');
      Arr.push({
        ...user?.Report?.userInfo,
        Addres: user?.Report.Address,
        PhoneNo: user?.Report?.PhoneNo,
        uri: require('../../assets/img/profile.png'),
        time: user?.Report.time,
        title: 'Request sent by',
        status: user?.ReportStatus,
      });
    } else if (user?.Request) {
      console.log('User Screen');
      console.log(user?.Request.time);
      Arr.push({
        ...user?.Request?.VenderInfo,
        id: user?.id,
        uri: require('../../assets/img/Vendor.png'),
        time: user?.Request.time,
        title: 'Report Sent to',
        status: user?.RequestStatus,
      });
    } else {
      setError(true);
    }
    // console.log(Arr);
    setArray(Arr);
  }, [user]);
  console.log('---->>>. ', user?.RequestStatus);
  let carouselData = [
    {
      title: 'Verify your Email',
      body: 'Please Verify your Email Address to get New Update ',
      IconName: 'email-alert',
    },
    {
      title: 'Compleate your Information',
      body: 'Please Compleate your Information',
      IconName: 'information',
    },
  ];
  // if (!currentState.phoneVarified) {
  //   carouselData.splice(0, 0, {
  //     title: 'Verify your number',
  //     body: 'Please Verify your Phone Number to sell or buy products',
  //     IconName: 'cellphone-information',
  //     onPress: () => {
  //       navigation.navigate('PhoneNo');
  //       setModalVisible(false);
  //     },
  //   });
  // }

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.CarouselContainer} key={index}>
        {/* <Image source={{uri: item.imgUrl}} style={styles.CarouselImage} /> */}
        <TouchableOpacity activeOpacity={1} onPress={item?.onPress}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                style={{alignSelf: 'center'}}
                name={item.IconName}
                size={30}
                color={BLACK}
              />

              <Text style={styles.CarouselHeader}>{item.title}</Text>
            </View>
            <Text style={styles.CarouselBody}>{item.body}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View>
          <Text
            style={{
              // backgroundColor: 'red',
              position: 'absolute',
              top: 15,
              left: 15,
              fontWeight: '600',
              fontSize: 24,
              color: BLACK,
            }}>
            <AntDesign style={{color: BLACK}} name={'warning'} size={30} />
            Warnings
          </Text>
          <Entypo
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-end',
              // position: 'absolute',
              color: '#e5f2ce',
              backgroundColor: '#6ba706',
              padding: 10,
              margin: 5,
              borderRadius: 30,
              // borderWidth: 1,
              overflow: 'hidden',
              color: BLACK,
            }}
            name="cross"
            size={35}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <MaterialCommunityIcons
                style={{position: 'absolute', color: BLACK}}
                name="gesture-swipe"
                size={45}
              />
              <Text
                style={{
                  // backgroundColor: 'red',
                  position: 'absolute',
                  top: 50,
                  textAlign: 'center',
                  color: BLACK,
                }}>
                gesture {'\n'} swipe
              </Text>
            </View>
            <Carousel
              layout="tinder"
              layoutCardOffset={9}
              ref={isCarousel}
              data={carouselData}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              useScrollView={true}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            style={{position: 'absolute', color: BLACK}}
            name={'ios-notifications-outline'}
            size={35}
          />

          <Text
            style={{
              // backgroundColor: 'red',
              // position: 'absolute',
              bottom: 7,
              left: 28,
              fontWeight: '600',
              fontSize: 24,
              padding: 10,
              color: BLACK,
            }}>
            Notifications
          </Text>
        </View>
        {/* <Pressable
		style={[styles.button, styles.buttonClose]}
		onPress={() => setModalVisible(!modalVisible)}>
		<Text style={styles.textStyle}>Clear</Text>
	      </Pressable> */}
        {error ? (
          <Text style={{color: BLACK}}>No Notification Here!</Text>
        ) : (
          <View>
            <FlatList
              data={Array}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <View style={styles.listItem}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={item?.uri}
                        style={{height: 80, width: 70, borderRadius: 10}}
                      />
                      <View style={{flexDirection: 'column', left: 10}}>
                        <Text style={[styles.modalTextHead, {color: BLACK}]}>
                          {item.title} {item?.Name}
                        </Text>
                        <Text style={[styles.modalTextDis, {color: BLACK}]}>
                          {item?.PhoneNo}
                        </Text>
                        <Text style={[styles.modalTextDis, {color: BLACK}]}>
                          {item?.Addres}
                        </Text>
                        <Text style={[styles.modalTextDis, {color: BLACK}]}>
                          {item?.time}
                        </Text>
                        <Text style={[styles.modalTextDis, {color: BLACK}]}>
                          {item?.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 22 : 0,
    height: '100%',
    width: '100%',
  },
  modalView: {
    height: '100%',
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },
  modalTextHead: {
    fontWeight: '700',
  },
  CarouselContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#d1e6a5',
    borderRadius: 8,
    width: ITEM_WIDTH - 50,
    height: 100,
    // paddingBottom: 40,
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.39,
    shadowRadius: 4.85,
    elevation: 7,
  },
  CarouselImage: {
    width: ITEM_WIDTH - 200,
    height: 100,
  },
  CarouselHeader: {
    color: '#222',
    fontSize: 23,
    fontWeight: '500',
    paddingLeft: 10,
    paddingTop: 10,
  },
  CarouselBody: {
    color: '#222',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItem: {
    backgroundColor: '#d1e6a5',
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 15,
    width: '100%',
    margin: 10,
    padding: 15,
  },
});
