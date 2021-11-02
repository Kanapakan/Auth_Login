import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from "@expo/vector-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import UserDetail from './screens/UserDetail';

import LogIn from './components/Login';
import Home from "./components/Home";
import Register from './components/Register';
import RegisterUserDetail from './components/RegisterUserDetail';

import BottomTabScreen from './Navigation/BottomTab';
import UserProfile from './screens/MyProfile';

const Stack = createStackNavigator();
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
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
    
  )

  // return <UserProfile />;


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
