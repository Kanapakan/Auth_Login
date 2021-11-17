import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'


import LogIn from './components/Login';
import Register from './components/Register';
import RegisterUserDetail from './components/RegisterUserDetail';
import BottomTabScreen from './Navigation/BottomTab';
// import UserReducer from './store/reducers/UserReducer';
// import recipeReducer from './store/reducers/recipeReducer';

import store from './store/store';

const Stack = createStackNavigator();


  // const store = createStore(rootReducer);

function Mystack(){
  return  (
    <Stack.Navigator initialRouteName={BottomTabScreen}>
      <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LogIn} />
      <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
      <Stack.Screen name="RegisterUserDetail" options={{ headerShown: false }} component={RegisterUserDetail} />
      <Stack.Screen name="BottomTabScreen" options={{ headerShown: false }} component={BottomTabScreen} />
     </Stack.Navigator>
  
  )
}

export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Mystack />
      </NavigationContainer>
    </Provider>
  )

  // return <Try />;


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
