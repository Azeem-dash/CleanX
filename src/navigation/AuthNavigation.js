import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Welcome from '../container/auth/welcome';
import SignUp1 from '../container/auth/SignUp1';
import Login from '../container/auth/Login';
import Landing from '../container/auth/Landing';
import SignUp2 from '../container/auth/SignUp2';

const Stack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={'Landing'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Landing"
        component={Landing}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="SignUp1"
        component={SignUp1}
      />
      <Stack.Screen
        options={{
          // ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        name="SignUp2"
        component={SignUp2}
      />
    </Stack.Navigator>
  );
}
