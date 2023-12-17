import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../container/home/users/home';
import ShowVendors from '../container/home/report/ShowVendors';
import Message from '../container/home/report/massegeFlow/message';
import VerifyOTP from '../container/home/verifyPhone/VerifyOTP';
import PhoneNo from '../container/home/verifyPhone/phoneNo';
import Profile from '../container/home/profile';
import Location from '../container/home/report/massegeFlow/location';
import MyPoints from '../container/home/Vendors/MyPoints';
import MyRequest from '../container/home/Vendors/MyRequest';
import PendingWork from '../container/home/Vendors/PendingWork';
import ViewRequest from '../container/home/Vendors/ViewRequest';
import MyReport from '../container/home/users/MyReport';
import ViewReport from '../container/home/users/ViewReport';
import Notification from '../container/home/notification';
import Update from '../container/home/users/Update';
import UpdatePasword from '../container/home/users/UpdatePasword';
import VendorProfile from '../container/home/report/VendorProfile';
const Stack = createStackNavigator();
export default function UserStock() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ShowVendors"
        component={ShowVendors}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Message"
        component={Message}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="VendorProfile"
        component={VendorProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="VerifyOTP"
        component={VerifyOTP}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PhoneNo"
        component={PhoneNo}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Location"
        component={Location}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MyPoints"
        component={MyPoints}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MyRequest"
        component={MyRequest}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PendingWork"
        component={PendingWork}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="ViewRequest"
        component={ViewRequest}
      />
      <Stack.Screen
        options={{
          // ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="MyReport"
        component={MyReport}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
        }}
        name="ViewReport"
        component={ViewReport}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="Update"
        component={Update}
      />
      <Stack.Screen
        options={{
          // ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="UpdatePasword"
        component={UpdatePasword}
      />
    </Stack.Navigator>
  );
}
