import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from "@expo/vector-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddUserScreen from '../my-app/screens/AddUserScreen';
import UserScreen from '../my-app/screens/UserScreen';
import UserDetail from '../my-app/screens/UserDetail';

import LogIn from './components/Login';
import Home from "./components/Home";
import Register from './components/Register';
import AddUserDetail from './components/AddUserDetail';

import BottomTabScreen from './Navigation/BottomTab';

const Stack = createStackNavigator();
function Mystack(){
  return  (
    <Stack.Navigator initialRouteName={BottomTabScreen}>
      <Stack.Screen options={{ headerShown: false }} name="LogIn" component={LogIn} />
      <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      <Stack.Screen options={{ headerShown: false }} name="AddUserDetail" component={AddUserDetail} />
      <Stack.Screen options={{ headerShown: false }} name="BottomTabScreen" component={BottomTabScreen} />
     </Stack.Navigator>
  
  )
}

export default function App() {
  return(
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
    
  )

  // return <Navigator />;


  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen options={{ headerShown: false }} name="Login" component={LogIn} />
  //       <Stack.Screen name="Home" component={Home} />
        
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
