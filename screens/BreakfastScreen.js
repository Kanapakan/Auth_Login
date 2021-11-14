import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
// import RecipeList from "../components/Recipe/RecipeList";
import RecipeMealList from "../components/Recipe/RecipeMealList";
import { useSelector } from 'react-redux';

const Breakfast = ({navigation, route}, props) => {
  const [sumKcals, setSumkcals] = useState(0);
  // if(props.mealTime == "breakfast"){
  //   setTime(useSelector((state) => state.recipes.breakfastMeals))
  // } else if (props.mealTime == "lunch"){
  //   setTime(useSelector((state) => state.recipes.lunchMeals))
  // } else if (props.mealTime == "dinner"){
  //   setTime(useSelector((state) => state.recipes.dinnerMeals))
  // }
    const breakfast = (useSelector((state) => state.recipes.breakfastMeals))
    const callbackFunction  = (kcals) => {
      setSumkcals(kcals)
   //    console.log(timeMeals.length)
   if(breakfast.length == 0 ){
   // console.log("nothing")
   setSumkcals(0)
}
}
  return (

// รายการที่เลือก
<View style={styles.container}>
<Text style={{backgroundColor: "gray"}}>ปริมาณแคลอรี่ที่กิน รวม {sumKcals}
    </Text>

    <RecipeMealList
      mealTime={route.params.mealTime}
      style={{ width: "100%", height: "100%" }}
      listData={breakfast}
      navigation={navigation}
      parentCallback = {callbackFunction }
    />

</View>



  );
};

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

export default Breakfast;
