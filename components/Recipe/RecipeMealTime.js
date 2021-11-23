import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMealTime, toggleEatKcals } from '../../store/actions/recipeAction';
import firebase from 'firebase';
import { auth } from '../../database/Auth';
const dbrealTime = firebase.app().database('https://fir-react-example-1e215-default-rtdb.asia-southeast1.firebasedatabase.app/');

const RecipeMealTime = (props) => {
  const datePick = (useSelector((state) => state.user.datePick));
  const allMeal = (useSelector((state) => state.recipes.allMeals))
  const sumNutrient = (useSelector((state) => state.recipes.sumNutrient))
  const sumEatKcals = (useSelector((state) => state.recipes.sumEatKcals))
  // const sumCalList = props.sumCalList
  const dateKey = props.dateKey
  // useEffect(() => {
    

  // }, []);

  const dispatch = useDispatch();
  const toggleMealTimeHandler = (mealId, Time, order, carbs, fats, protein) => {
    console.log(props.id, props.mealTime)
    dispatch(toggleMealTime(mealId, Time, order, carbs, fats, protein));

  }

  const toggleEatKcalsHandler = (kcals) => {
    console.log(kcals)
    dispatch(toggleEatKcals(kcals))

  }

  // ---------- กดลบเมนูอาหาร ---------------   
  const delRecipe = () => {

    console.log('del', props.id, props.mealTime)

    toggleMealTimeHandler(props.id, props.mealTime, "del", props.carbs, props.fats, props.protein)
    toggleEatKcalsHandler(props.kcal)
    
   
    updateUserHistory()
      
  }



  const updateUserHistory = () => {


      dbrealTime.ref("user_History/Recipe_of_day/" + dateKey).update({
        // date: date,
        recipes: allMeal,
        sumCal: sumEatKcals,
        sumNutrient: sumNutrient,
        // userId: auth.currentUser?.uid
      })
       console.log(sumEatKcals)
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onSelectRecipe} >
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.food} source={{ uri: props.image }} />

          <View style={styles.foodBox}>
            <Text numberOfLines={1} style={styles.foodName}>{props.name}</Text>

            <View style={styles.foodTime}>
              <MaterialIcons name="access-time" size={26} color="black" />
              <Text style={styles.timeText}>{props.time} นาที</Text>
            </View>

          </View>
          <View style={styles.box2}>
            <TouchableOpacity onPress={() => delRecipe(datePick)}>
              <Ionicons name="ios-trash-bin-sharp" color="#adacac" style={styles.delMeal} />
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
  headBox: {
    backgroundColor: "#e3e3e3",
    //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
    alignItems: "flex-start",
    padding: 8
  },
  headText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  food: {
    height: 100,
    flex: 1,
    marginLeft: 10,
    borderRadius: 15
  },
  foodBox: {
    flexDirection: 'column',
    flex: 2,
  },
  box2: {
    flex: 1,
    flexDirection: 'column'
  },
  foodName: {
    width: 230,
    fontSize: 20,
    fontWeight: "bold",
    flex: 2,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  foodCal: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 23,
    flex: 1,
  },
  foodTime: {
    flex: 1,
    marginLeft: 10,
    marginTop: 20,
  },
  delMeal: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 43,
    flex: 1,
  },
  timeText: {
    fontSize: 18,
    marginTop: -25,
    marginLeft: 30,
  },
  line: {
    height: 2,
    backgroundColor: "#adacac",
    marginTop: 20
  }

});

export default RecipeMealTime;