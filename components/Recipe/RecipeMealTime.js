import React from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMealTime } from '../../store/actions/recipeAction';

const RecipeMealTime = (props) => {
    
     // ---------- เพิ่มเมนูอาหาร ---------------   
    const delRecipe = () => {
        console.log('del', props.id, props.mealTime)
        toggleMealTimeHandler(props.id, props.mealTime)
    }

        const dispatch = useDispatch();
        const toggleMealTimeHandler = (mealId, Time) => {
        console.log(props.id, props.mealTime)
        dispatch(toggleMealTime(mealId, Time));
      }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onSelectRecipe} >
              <View style={{flexDirection: 'row', marginTop: 20}}>
                  <Image style={styles.food} source={{ uri: props.image }}/>

                  <View style={styles.foodBox}>
                      <Text numberOfLines={1} style={styles.foodName}>{props.name}</Text>
                      
                      <View style={styles.foodTime}>
                          <MaterialIcons name="access-time" size={26} color="black"/>
                          <Text style={styles.timeText}>{props.time} นาที</Text>
                      </View>

                  </View>
                  <View style={styles.box2}>
                  <TouchableOpacity onPress={() => delRecipe()}>
                       <Ionicons name="ios-trash-bin-sharp" size={24} color="black" size={28}  style={styles.delMeal}/>
                  </TouchableOpacity>
                      <Text style={styles.foodCal}>{props.kcal} Kcal.</Text>
                  </View>
 
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
   
      
    </View>

    )
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
  box2:{
    flex: 1,
    flexDirection: 'column'
  },
  foodName:{
    width: 230 ,
    fontSize: 20,
    fontWeight: "bold",
    flex: 2,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  foodCal:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    flex: 1,
  },
  foodTime:{
    flex: 1,
    marginLeft: 10,
    // marginTop: -180,
  },
  delMeal: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 50,
    flex: 1,
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

export default RecipeMealTime;