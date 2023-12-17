import React, {useState, useEffect, useRef} from 'react';
// import Button from '../Components/buttons';
import auth from '@react-native-firebase/auth';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import CostoumText from '../../../components/costoumText';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../../../src/redux/actions/authentication';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MenuDrawer from 'react-native-side-drawer';
import storage from '@react-native-firebase/storage';

import Carousel from 'react-native-snap-carousel';
import {BLACK, WHITE} from '../../../constants/color';
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
import firestore from '@react-native-firebase/firestore';
export default function Home({navigation}) {
  FontAwesome.loadFont();
  AntDesign.loadFont();
  Entypo.loadFont();
  Feather.loadFont();
  MaterialIcons.loadFont();
  Ionicons.loadFont();
  MaterialCommunityIcons.loadFont();
  Octicons.loadFont();
  const [MyCity, setMyCity] = useState('');
  const [MyRegion, setMyRegion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [setZIndex, setSetZIndex] = useState(0);
  const [workstatus, setWorkstatus] = useState();
  const [ImgUri, setImgUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // const currentState = useSelector(state => state.UserValid);
  const dispatch = useDispatch();

  const user = useSelector(state => state.authReducer.user);
  // console.log('User in home--->>', user);
  const logout = () => {
    dispatch(setUser(null));
    auth().signOut();
  };
  //   console.log(user?.status);
  useEffect(() => {
    fecthUriData();
    // console.log(user?.ReportStatus, user?.Request?.VenderInfo?.ReportStatus);
    async function fetchData() {
      // You can await here
      const response = await Axios.get('https://ipinfo.io');
      setMyCity(response.data.city);
      setMyRegion(response.data.region);
      // console.log(response.data.city, response.data.region);
      fadeIn();
      // ...
    }
    fetchData();
    let string = `Is Your Work Is Done By ${user?.Request?.VenderInfo?.Name}?`;
    if (user?.RequestStatus == 'Done') {
      Alert.alert('Work', string, [
        {
          text: 'Yes',
          onPress: () => PressedYes(),
          style: 'OK',
        },
        {
          text: 'No',
          onPress: () => PressedNo(),
        },
      ]);
    } else if (user?.RequestStatus == 'Compleated') {
      alert('Well Done Your frist work is done!');
    }
  }, [user?.RequestStatus]);
  const fecthUriData = async () => {
    //       if (user?.UserProfileUri) {
    //         setLoading(true);
    //         const url = await storage().ref(user?.UserProfileUri).getDownloadURL();
    //         setImgUri(url);
    //         setLoading(false);
    //       } else {
    //         setImgUri('../../assets/img/profile.png');
    //       }
    // console.log(url);
  };
  const PressedYes = async () => {
    console.log('Yes');
    //     try {
    //       await firestore()
    //         .collection('users')
    //         .doc(user?.Request?.VenderInfo?.UID)
    //         .update({
    //           ReportStatus: 'Compleated',
    //         })
    //         .then(() => {
    //           firestore()
    //             .collection('users')
    //             .doc(user?.id)
    //             .update({
    //               RequestStatus: 'Compleated',
    //             })
    //             .then(e => {
    //               console.log('uploaded! in yes');
    //               alert('You Work is done successfully!');
    //               navigation.navigate('Home');
    //             });
    //         });
    //     } catch (e) {
    //       console.log(e);
    //     }
  };
  const PressedNo = async () => {
    console.log('No');
    //     try {
    //       await firestore()
    //         .collection('users')
    //         .doc(user?.Request?.VenderInfo?.UID)
    //         .update({
    //           ReportStatus: 'Working',
    //         })
    //         .then(() => {
    //           firestore()
    //             .collection('users')
    //             .doc(user?.id)
    //             .update({
    //               RequestStatus: 'Working',
    //             })
    //             .then(e => {
    //               console.log('uploaded! in No');
    //               alert('You Work is Still pending!');
    //               navigation.navigate('Home');
    //             });
    //         });
    //     } catch (e) {
    //       console.log(e);
    //     }
  };
  var today = new Date();
  var Ndate =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  var time = today.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
  });
  var dateTime = Ndate + ' | ' + time;
  // console.log(dateTime);
  // console.log('User in home--->>', user?.RequestStatus);

  const SlideInLeft = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change SlideInLeft value to 1 in 5 seconds
    Animated.timing(SlideInLeft, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const drawerContent = () => {
    return (
      <View style={styles.DrawerBox}>
        <TouchableOpacity
          onPress={() => {
            setdrawerOpen(false), setSetZIndex(0);
          }}>
          <Entypo size={30} name={'cross'} color={BLACK} />
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate('Profile'),
              setdrawerOpen(false),
              setSetZIndex(0);
          }}
          style={{
            flexDirection: 'row',
            padding: 5,
            borderWidth: 1,
            margin: 7,
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#ffff',
          }}>
          <AntDesign color={BLACK} size={20} style={{right: 5}} name={'user'} />
          <Text style={{color: BLACK}}>Profile</Text>
        </Pressable>

        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('MyReport'),
                setdrawerOpen(false),
                setSetZIndex(0);
            }}
            style={{
              flexDirection: 'row',
              padding: 5,
              borderWidth: 1,
              margin: 7,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#ffff',
            }}>
            <AntDesign
              color={BLACK}
              size={20}
              style={{right: 5}}
              name={'eyeo'}
            />
            <Text style={{color: BLACK}}>Reports</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('UpdatePasword'),
                setdrawerOpen(false),
                setSetZIndex(0);
            }}
            style={{
              flexDirection: 'row',
              padding: 5,
              borderWidth: 1,
              margin: 7,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#ffff',
            }}>
            <AntDesign
              color={BLACK}
              size={20}
              style={{right: 5}}
              name={'setting'}
            />
            <Text style={{color: BLACK}}>Setting</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => logout()}
          style={{
            top: screenHeight / 1.55,
            flexDirection: 'row',
            padding: 5,
            borderWidth: 1,
            margin: 7,
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#ffff',
          }}>
          <AntDesign
            color={BLACK}
            size={20}
            style={{right: 5}}
            name={'logout'}
          />
          <Text style={{color: BLACK}}>Logout</Text>
        </Pressable>
      </View>
    );
  };
  const isCarousel = React.useRef(null);
  const CheckVendor = () => {
    // console.log(user?.ReportStatus);
    navigation.navigate('ShowVendors');
    // if (user?.RequestStatus == 'Working' || user?.RequestStatus == 'pending') {
    //   // alert(
    //   //   'once you sent the report you will not able to send again until previous request is not done',
    //   // );
    //   Alert.alert(
    //     'Report',
    //     'Once you sent the report you will not able to send again until previous request is not done',
    //     [
    //       {
    //         text: 'See My Report',
    //         onPress: () => navigation.navigate('MyReport'),
    //         style: 'OK',
    //       },
    //       {text: 'Cancel', onPress: () => console.log('OK Pressed')},
    //     ],
    //   );
    // } else if (user?.RequestStatus == 'Compleated') {
    //   navigation.navigate('ShowVendors');
    // } else {
    //   navigation.navigate('ShowVendors');
    // }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setdrawerOpen(false), setSetZIndex(0);
      }}>
      <SafeAreaView>
        {/* <ScrollView> */}
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
        <View>
          <View style={{zIndex: setZIndex}}>
            <MenuDrawer
              open={drawerOpen}
              drawerContent={drawerContent()}
              drawerPercentage={45}
              animationTime={250}
              overlay={false}
              opacity={1}>
              <AntDesign
                onPress={() => {
                  setdrawerOpen(true), setSetZIndex(1);
                }}
                style={{
                  alignSelf: 'flex-start',
                  position: 'absolute',
                  color: '#6ba706',
                  padding: 10,
                }}
                name="bars"
                size={40}
              />
            </MenuDrawer>
            <Avatar.Image
              size={100}
              source={require('../../../assets/img/logo.png')}
              style={{
                bottom: 15,
                backgroundColor: '#ffff',
                borderWidth: 0,
                // margin: 5,
                alignSelf: 'center',
              }}
            />

            <AntDesign
              onPress={() => navigation.navigate('Notification')}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                color: '#e5f2ce',
                backgroundColor: '#6ba706',
                padding: 10,
                borderRadius: 30,
                // borderWidth: 1,
                overflow: 'hidden',
              }}
              name="notification"
              size={35}
            />
          </View>
          <View style={{bottom: 15}}>
            {loading ? (
              <ActivityIndicator
                style={{
                  backgroundColor: '#ffff',
                  height: 100,
                  width: 100,
                  position: 'absolute',
                  borderRadius: 100,
                }}
                size="large"
                color="green"
              />
            ) : (
              <Image
                // size={100}
                source={require('../../../assets/img/profile.png')}
                style={{
                  backgroundColor: '#ffff',
                  height: 100,
                  width: 100,
                  position: 'absolute',
                  borderRadius: 100,
                }}
              />
            )}

            <View style={{left: 100}}>
              <Text style={{fontWeight: '400', fontSize: 19, color: BLACK}}>
                Welcome !! {user?.Name}
              </Text>
              {/* <CostoumText
            style={{fontWeight: '400', fontSize: 19, color: BLACK}}
            text={'Welcome !!'}
          /> */}
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <AntDesign
                  style={{color: 'grey', position: 'absolute'}}
                  name="calendar"
                  size={25}
                />

                <CostoumText text={dateTime} style={{left: 25, color: BLACK}} />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <FontAwesome
                  style={{color: 'grey', position: 'absolute'}}
                  name="location-arrow"
                  size={25}
                />
                <Text style={{padding: 5, left: 20, color: BLACK}}>
                  {MyCity}, {MyRegion}
                </Text>
              </View>
            </View>
          </View>
          <Image
            size={100}
            source={require('../../../assets/img/welcome.png')}
            style={{
              height: 550,
              width: 410,
              alignSelf: 'flex-end',
              top: 200,
              left: 55,
              position: 'absolute',
              overflow: 'hidden',
              // zIndex: 1,
            }}
          />
          <View style={{top: 150}}>
            {/* ------------------Sell--------------------- */}
            {/* <Animated.View
              style={{
                transform: [
                  {
                    translateY: SlideInLeft.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              }}> */}
            <View style={styles.ComponentView}>
              <View style={{padding: 5}}>
                <Text style={{fontSize: 17, fontWeight: '500', color: BLACK}}>
                  Hey, good news!!
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300', color: BLACK}}>
                  You can now sell your wast and{'\n'} earn
                </Text>
                <FontAwesome
                  style={{top: 3, left: 3, color: '#7fba1c'}}
                  name="bookmark"
                  size={15}
                />
              </View>

              <View style={styles.ComponentBtnView}>
                <View style={{padding: 5}}>
                  <AntDesign
                    style={{alignSelf: 'center', color: BLACK}}
                    name="tags"
                    size={35}
                  />

                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: 'center',
                      color: '#7fba1c',
                    }}>
                    Sell
                  </Text>
                </View>
              </View>
            </View>
            {/* </Animated.View> */}
            {/* ---------------------Report--------------------- */}

            {/* <Animated.View
                style={{
                  transform: [
                    {
                      translateY: SlideInLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [600, 0],
                      }),
                    },
                  ],
                }}> */}
            <View style={styles.ComponentView}>
              <View style={{padding: 5}}>
                <Text style={{fontSize: 17, fontWeight: '500', color: BLACK}}>
                  Found any littered spot??
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300', color: BLACK}}>
                  You can now report here and{'\n'} earn point
                </Text>
                <FontAwesome
                  style={{top: 3, left: 3, color: '#7fba1c'}}
                  name="bookmark"
                  size={15}
                />
              </View>

              <TouchableOpacity
                style={styles.ComponentBtnView}
                activeOpacity={1}
                onPress={() => CheckVendor()}>
                <View>
                  <View style={{padding: 5}}>
                    <AntDesign
                      style={{alignSelf: 'center', color: BLACK}}
                      name="exclamationcircle"
                      size={35}
                    />
                    <Text
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        color: '#7fba1c',
                      }}>
                      Report
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* </Animated.View> */}

            {/* ---------------------------------Buy------------------ */}
            {/* <Animated.View
              style={{
                transform: [
                  {
                    translateY: SlideInLeft.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              }}> */}
            <View style={styles.ComponentView}>
              <View style={{padding: 5}}>
                <Text style={{fontSize: 17, fontWeight: '500', color: BLACK}}>
                  Redeem your earning!!
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300', color: BLACK}}>
                  Redeem your earning in E-store
                </Text>
                <FontAwesome
                  style={{top: 3, left: 3, color: '#7fba1c'}}
                  name="bookmark"
                  size={15}
                />
              </View>

              <View style={styles.ComponentBtnView}>
                <View style={{padding: 5}}>
                  <AntDesign
                    style={{alignSelf: 'center', color: BLACK}}
                    name="shoppingcart"
                    size={35}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: 'center',
                      color: '#7fba1c',
                    }}>
                    E-Store
                  </Text>
                </View>
              </View>
            </View>
            {/* </Animated.View> */}
          </View>

          {/* ---------------Notification--------------- */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ComponentView: {
    backgroundColor: '#e5f2ce',
    padding: 10,
    margin: 15,
    borderRadius: 10,
    height: 110,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  ComponentBtnView: {
    backgroundColor: '#ffff',
    padding: 10,
    width: 130,
    alignSelf: 'flex-end',
    borderRadius: 10,
    position: 'absolute',
    top: 7,
    right: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  button: {
    position: 'absolute',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    // alignSelf: 'flex-end',
    right: 1,
    top: 180,
    backgroundColor: '#78ae02',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // modalText: {
  //   marginTop: 15,
  //   textAlign: 'center',
  // },
  listItem: {
    backgroundColor: '#d1e6a5',
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 15,
    width: '100%',
    margin: 10,
    padding: 15,
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
  DrawerBox: {
    flex: 1,
    backgroundColor: '#90Ef99',
    // backgroundColor: 'red',
    padding: 10,
    position: 'absolute',
    // width: screenWidth,
    height: screenHeight,
    top: 0,
    left: 0,
    width: screenWidth / 2.5,
    zIndex: 0,
  },
});
