import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './navigation/AuthNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, SetType} from '../src/redux/actions/authentication';
import firestore from '@react-native-firebase/firestore';
import UserStack from './navigation/userStack';
import VendorStack from './navigation/vendorStack';
import UserStock from './navigation/userStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {StyleSheet, View, Text} from 'react-native';
import SimpleLottie from './components/SimpleLottie';
export default function Main() {
  // Set an initializing state whith Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const [state, setState] = useState();
  // Handleuser state change
  const onAuthStateChanged = user => {
    // console.log('my user is here', user);
    setUserInfo(user);
    if (initializing) {
      setInitializing(false);
    }
  };
  const SetTypeStatus = useSelector(state => state.authReducer.SetTypeStatus);
  // console.log('SetTypeStatus', SetTypeStatus);

  useEffect(() => {
    loggedIn();
  }, []);

  const loggedIn = async () => {
    let loginId = await AsyncStorage.getItem('LoginStatus');
    dispatch(SetType(loginId));
    setState(loginId);
    // console.log(`AsyncStorage ID-----> ${loginId}`);
  };
  // if (!SetTypeStatus) dispatch(SetType('users'));
  // console.log('statestatestate', state);

  const mainfun = () => {
    // console.log('end');
    setLoading(false);
    let userDataSubscriber;
    if (userInfo) {
      // console.log(userInfo.uid);
      userDataSubscriber = firestore()
        .collection(SetTypeStatus)
        .doc(userInfo.uid)
        .onSnapshot(result => {
          // console.log('USER UPDATED', result.data());
          if (result) {
            console.log('UserStatus--> ', result.data());
            if (result?.exists === false) {
              auth().signOut();
            }
            dispatch(setUser({...result.data(), id: userInfo.uid}));
          } else {
            dispatch(setUser(null));
          }
        });
      return userDataSubscriber;
    } else {
      dispatch(setUser(null));
    }
  };
  useEffect(() => {
    // console.log('start');
    setLoading(true);
    setTimeout(mainfun, 2000);
  }, [state]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (loading) return <SimpleLottie />;
  if (!userInfo) {
    return <AuthNavigator />;
  }
  if (SetTypeStatus === 'vendor') {
    // return <VendorStack />;
    return loading ? <SimpleLottie /> : <VendorStack />;
  } else if (SetTypeStatus === 'users') {
    // return <UserStock />;
    // return <SimpleLottie />;
    return loading ? <SimpleLottie /> : <UserStock />;
  } else {
    return null;
  }
}
