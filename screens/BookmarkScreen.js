import React, { useRef } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import RecipeList from "../components/Recipe/RecipeList";
import { useSelector } from 'react-redux';
// import { RECIPES } from "../dataJson/recipeData";

const BookmarkScreen = ({navigation, route}) => {
    const bookmark = (useSelector((state) => state.recipes.bookmarkRecipes))

    return (
        <View style={styles.container}>
            <RecipeList
          style={{ width: "100%", height: "100%" }}
          listData={bookmark}
          navigation={navigation}
          />
        </View>
        
          
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      // justifyContent: "center",
    },
    headBox:{
      backgroundColor: "#e3e3e3",
      //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
      alignItems: "flex-start",
      padding: 8
    },
    headText:{
      fontSize:23,
      fontWeight: "bold",
      color: "#000",
      marginLeft: 10
    },
    food:{
      height: 100,
      flex: 1,
      marginLeft: 10,
      borderRadius: 15
    },
    foodBox:{
      flexDirection: 'column',
      flex: 2,
    },
    foodName:{
      fontSize: 22,
      fontWeight: "bold",
      flex: 2,
      marginLeft: 10,
      marginTop: 10,
      flexWrap: "wrap",
    },
    foodCal:{
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
      flex: 1,
    },
    foodTime:{
      flex: 1,
      marginLeft: 10,
      // marginTop: -180,
    },
    timeText:{
      fontSize: 18,
      marginTop: -25,
      marginLeft: 30,
    },
    line:{
        height: 2,
        backgroundColor: "#adacac",
        marginTop: 20
    }
  
  });
  
  export default BookmarkScreen;