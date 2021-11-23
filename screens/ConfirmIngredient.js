import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from "react-native";




const ConfirmIngredient  = ({route, navigation},props) =>  {
  const{select} = route.params;

  
  const renderFlatList = (renderData) => {
    return(
      <FlatList
          data={renderData}
          renderItem={({ item }) => (
            <View style={styles.checkContainer}>
                <Text style={styles.ingredientName}>{item}</Text>
           </View>
          )}
    />
    )
  }

  return (
    
    // ตรวจสอบวัตถุดิบที่เลือก
    
        <View style={styles.container}>    
            <View style={{flex: 3.4 }}>
               
                <View style={styles.square}>
                  <ScrollView>
                <Text style={styles.ingredientName}>{renderFlatList(select)}</Text>   
                 </ScrollView>  
                </View>
            
            </View>

            
                
            <View style={{flex:0.5, justifyContent:"center", backgroundColor: "#e4efe3"}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("ResultFindRecipe", {select: select})} 
                    style={styles.btnContainer}>
                    <Text style={styles.btnText}>ค้นหา</Text>
                </TouchableOpacity>
    
            </View>      
          
        </View>
      )      



};
    
const styles = StyleSheet.create({
    container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
// css ตรวจสอบวัตถุดิบที่เลือก
  btnContainer: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    padding: 15,
    alignSelf: "center",
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  square:{
      width: "90%",
      backgroundColor: "#8ec18d",
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 20,
      borderWidth: 5, 
      borderColor: '#8ec18d',
  },
  checkContainer:{
    flex: 0.17,
    paddingLeft: 10
  },
  ingredientName:{
    // flex: 1,
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
    paddingVertical:5
  },
  // amount:{
  //   fontSize: 20,
  //   color: "#000",
  //   fontWeight: "bold",
  //   marginTop: 20,
  //   paddingLeft: 20
  // }


    
    });
    
    export default ConfirmIngredient;
    
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