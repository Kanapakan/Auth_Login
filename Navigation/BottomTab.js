import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native'; // v.6.x
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import AddUserScreen from '../screens/AddUserScreen';
// import UserScreen from '../my-app/screens/UserScreen';
// import UserDetail from '../my-app/screens/UserDetail';
// import LogIn from './components/Login';
import Home from "../components/Home";
// import Register from './components/Register';
// import AddUserDetail from './components/AddUserDetail';
import AddUserScreen  from '../screens/AddUserScreen';
import UserScreen from '../screens/UserScreen';
import UserDetail from '../screens/UserDetail';


// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (

        <MainNavigator />

    );
}

const customTabBarStyle = {
    activeTintColor: '#fffff', //เปลี่ยนเป็นสีเขียวตามงานเรา
    inactiveTintColor: 'gray',
    // style: {backgroundColor: '#E4EFE3' },
}

//Navigators หลัก
function MainNavigator() { 
    return (
      <Tab.Navigator 
      tabBarOptions={customTabBarStyle}
      shifting="false" screenOptions={{   headerStyle: { backgroundColor: "#8EC18D", },  headerTintColor: "white",  headerShown: false}}>
        <Tab.Screen name="Home" component={HomeNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <Entypo name="home" size={28} color={color} />;
            },
          }} />
        <Tab.Screen name="Search" component={SearchNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <AntDesign name="search1" size={28} color={color} />;
            },
          }} />
        <Tab.Screen name="Favorites" component={FavNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <AntDesign name="heart" size={28} color={color} />;
            },
          }} />
        <Tab.Screen name="User" component={UserNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <FontAwesome name="user" size={28} color={color} />;
            },
          }} />
      </Tab.Navigator>
    );
  }

function UserNavigator() { 
    return(
        <Stack.Navigator screenOptions={{ 
            // headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3"},
            headerTintColor: "#547F53",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:  "25px",
            },
             }}>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </Stack.Navigator>
    )
}

function HomeNavigator() { 
    return(
        <Stack.Navigator screenOptions={{ 
            // headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3"},
            headerTintColor: "#547F53",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:  "25px",
            },
             }}>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
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

function SearchNavigator() { 
    return(
        <Stack.Navigator screenOptions={{ 
            // headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3"},
            headerTintColor: "#547F53",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:  "25px",
            },
             }}>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </Stack.Navigator>
    )
}

function FavNavigator() { 
    return(
        <Stack.Navigator screenOptions={{ 
            // headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3"},
            headerTintColor: "#547F53",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:  "25px",
            },
             }}>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </Stack.Navigator>
    )
}