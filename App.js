import React from 'react';
import Main from './src/Main';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
