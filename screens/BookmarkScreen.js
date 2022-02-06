import React, { useRef } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import RecipeList from "../components/Recipe/RecipeList";
import { useSelector } from 'react-redux';

const BookmarkScreen = ({navigation, route}) => {
    const bookmark = (useSelector((state) => state.recipes.bookmarkRecipes))
    return (
        <View style={styles.container}>
          <Text style={styles.headText}>{bookmark.length == 0 ? "ยังไม่มีรายการอาหาร" : "มีรายการอาหาร : "+bookmark.length   }</Text>
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
    },
    headBox:{
      backgroundColor: "#e3e3e3",
      alignItems: "flex-start",
      padding: 8
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
    },
    headText:{
      fontSize: 15,
      fontWeight: "bold",
      color: "#000",
      marginTop: 10,
      marginLeft: 10
    },
  
  });
  
  export default BookmarkScreen;