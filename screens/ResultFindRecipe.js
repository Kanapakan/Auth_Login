import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, ScrollView, FlatList} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import RecipeList from "../components/Recipe/RecipeList";
import { useSelector } from 'react-redux';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';



const ResultFindRecipe  = ({route, navigation},props) =>  {
  const{select} = route.params;
  const renderFlatList = (renderData) => {
    return(
      <FlatList
          data={renderData}
          renderItem={({ item }) => (
          
            <View>

             <Text>{item}</Text>

           </View>

          )}
    />
    )
  }
  return(
    <RecipeList
                    style={{ width: "100%", height: "100%" }}
                    listData={select[0]}
                    navigation={navigation}
                  />
  )

};
    
const styles = StyleSheet.create({
    container: {
    // flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  amount:{
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginTop: 20,
    paddingLeft: 20
  },
  // css ผลลัพธ์การค้นหาเมนูอาหารจากวัตถุดิบ
  card:{
    flexDirection: 'column',
    width: "90%",
    height: 200,
    backgroundColor: "#e4efe3",
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 5, 
    borderColor: "#e4efe3",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  food:{
    height: 100,
    flex: 1,
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
    flexWrap: "wrap",
  },
  foodCal:{
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  foodTime:{
    flex: 1,
    marginLeft: 10,
    marginTop: -30
  },
  timeText:{
    fontSize: 18,
    marginTop: -25,
    marginLeft: 30,
  },
  favIcon:{
    alignSelf: "flex-end",
  },
  moreText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    // marginVertical: 5,
    // marginTop: 10
  },
  infoText:{
    fontSize: 18,
    color: "red",
  }



    
    });
    
    export default ResultFindRecipe;
    
    {/* <Text style={{fontFamily: 'normal'}}>  normal </Text>
            <Text style={{fontFamily: 'notoserif'}}>  notoserif </Text>
            <Text style={{fontFamily: 'sans-serif'}}>  sans-serif </Text>
            <Text style={{fontFamily: 'sans-serif-light'}}>  sans-serif-light </Text>
            <Text style={{fontFamily: 'sans-serif-thin'}}>  sans-serif-thin </Text>
            <Text style={{fontFamily: 'sans-serif-condensed'}}>  sans-serif-condensed </Text>
            <Text style={{fontFamily: 'sans-serif-medium'}}>  sans-serif-medium </Text>
            <Text style={{fontFamily: 'serif'}}>  serif </Text>
            <Text style={{fontFamily: 'Roboto'}}>  Roboto </Text>
            <Text style={{fontFamily: 'monospace'}}>  monospace </Text>       */}