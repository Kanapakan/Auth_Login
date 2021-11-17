import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { createDrawerNavigator } from "@react-navigation/drawer";

import BookmarkScreen from "../screens/BookmarkScreen";
import HomeScreen from "../screens/HomeScreen";
// import Breakfast from "../screens/BreakfastScreen";
// import Dinner from "../screens/DinnerScreen";
// import Lunch from "../screens/LunchScreen";
import ThreeTimeMeals from "../screens/ThreeTimeMealScreen";

import MenuDetail from "../screens/MenuDetail";
import MyProfile from  '../screens/MyProfile';
import ChangeUserDetail from "../components/ChangeUserDetail";

import FindRecipe from "../screens/SearchScreen";

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (

        <MainNavigator />

    );
}

const customTabBarStyle = {
    activeTintColor: '#ffffff', //เปลี่ยนเป็นสีเขียวตามงานเรา
    inactiveTintColor: '#bdbdbd',
    keyboardHidesTabBar: true,
    showLabel: false,
    
}



//Navigators หลัก
function MainNavigator() { 
    return (
      <Tab.Navigator 
      tabBarOptions={customTabBarStyle}
      shifting="false" screenOptions={{ headerStyle: { backgroundColor: "#8EC18D", },  headerTintColor: "white",  headerShown: false}}>
        <Tab.Screen name="Home" component={HomeNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            
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
              return <FontAwesome name="bookmark" size={28} color={color} />
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
              // fontSize:  "25px",
            },
             }}>
            <Stack.Screen options={{ headerShown: false }} name="MyProfile" component={MyProfile} />
            <Stack.Screen name="ChangeUserDetail" component={ChangeUserDetail} 
            options={{
              title: 'แก้ไขโปร์ไฟล์'
          }} />
        </Stack.Navigator>
    )
}

function HomeNavigator() { 
    return(
        <Stack.Navigator screenOptions={{ 
            // headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3"},
            headerTintColor: "#547F53",
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   fontSize:  "25px",
            // },
             }}>
            {/* <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> */}
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen}/>
            {/* <Stack.Screen name="Breakfast"  component={Breakfast} options={{ title: 'มื้อเช้า' }}/>
            <Stack.Screen name="Lunch"  component={Lunch} options={{ title: 'มื้อกลางวัน' }}/>
            <Stack.Screen name="Dinner"  component={Dinner} options={{ title: 'มื้อเย็น' }}/> */}
            <Stack.Screen name="ThreeTimeMeals"  component={ThreeTimeMeals} options={ 
            ({ route }) => ({ 
              title: route.params.mealTimeThai })}/>
              <Stack.Screen name="MenuDetail" options={{
            headerShown: false }}
              component={MenuDetail} />

          

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
              // fontSize:  "25px",
            },
             }}>
            <Stack.Screen  name="FindRecipe" options={{ title: "ค้นหาเมนูอาหาร"}} component={FindRecipe} />
            <Stack.Screen name="MenuDetail" options={{
            headerShown: false }}
              component={MenuDetail} />
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
              // fontSize:  "25px",
            },
             }}>
            <Stack.Screen name="BookmarkScreen" options={{ title: "Bookmark"}} component={BookmarkScreen} />
            <Stack.Screen name="MenuDetail" options={{
            headerShown: false }}
              component={MenuDetail} />
        </Stack.Navigator>
    )
}