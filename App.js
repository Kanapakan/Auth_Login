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


const Stack = createStackNavigator();
function Mystack(){
  return  (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen}
          options={{
            title: 'Add User'
          }} />
      <Stack.Screen name="UserScreen" component={UserScreen}
          options={{
            title: 'User Screen'
          }} />
      <Stack.Screen name="UserDetail" component={UserDetail}
          options={{
            title: 'User Detail'
          }} />
     </Stack.Navigator>
  )

}

export default function App() {
  return(
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
  )
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
