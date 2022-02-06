import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterIngredients } from "../store/actions/recipeAction";

const ConfirmIngredient  = ({route, navigation},props) =>  {
  const[select, setSelect] = useState(route.params.select)
  // console.log(select)
  
  

  const delRecipe = (item) => {
    const index = select.findIndex(recipe => recipe == item)
    console.log(index)
    const updateSelect = [...select];
    updateSelect.splice(index, 1);
    
    setSelect(updateSelect)
    // console.log('del', select)
  }

  const searchRecipe = (item) =>{
    toggleFilterIngredientskHandler(item)
    navigation.navigate("ResultFindRecipe")
 }

  const dispatch = useDispatch();
  const toggleFilterIngredientskHandler = (ingedients) => {
  dispatch(toggleFilterIngredients(ingedients));
}

  const renderFlatList = (renderData) => {
    return(
      <FlatList
          data={renderData}
          renderItem={({ item }) => (
            <View style={styles.checkContainer}>
                <Text style={styles.ingredientName}>{item}</Text>
                <TouchableOpacity onPress={() => delRecipe(item)}>
                  <Ionicons name="ios-trash-bin-sharp" color="#000" style={styles.delIngredient} />
                </TouchableOpacity>
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
                {renderFlatList(select)}   
                </View>
            </View>

            
                
            <View style={{flex:0.5, justifyContent:"center", backgroundColor: "#e4efe3"}}>
                <TouchableOpacity 
                    onPress={() => searchRecipe(select)} 
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
      // backgroundColor: "#8ec18d",
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 20,
      borderWidth: 5, 
      borderColor: '#8ec18d',
      
  },
  checkContainer:{
    width: "100%",
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    alignSelf: "center",
    backgroundColor: '#8ec18d'
  },
  ingredientName:{
    flex: 1,
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
    paddingLeft: 10
    // paddingVertical:5
  },
  delIngredient:{
    fontSize: 28,
    fontWeight: "bold",
    // marginTop: 2,
    // marginLeft: 43,
    // flex: 1
  }


    
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