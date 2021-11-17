import React, {useState} from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity,FlatList, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import RecipeMealTime from "./RecipeMealTime";
import { useDispatch, useSelector } from 'react-redux';
// import { toggleEatKcals  } from '../../store/actions/recipeAction';

const RecipeMealList = (props) => {
  const [sumKcals, setSumkcals] = useState(0)
  let sumKcal = 0;
    const renderRecipeItem = (itemData) => {
        const {id, name, kcal, time, ingredient_quantity, ingredient_name, ingredient_type, steps, imageURL, originalURL ,carbs, protein, fats,} = itemData.item
        // console.log(props.mealTime)
        sumKcal += kcal
        setSumkcals(sumKcal)
    
        return (
            <View>
                <RecipeMealTime 
                // sumKcals={sumKcals}
                // onChange={onChangeSumKcals}
                mealTime={props.mealTime}
                carbs={carbs}
                fats={fats}
                protein={protein}
                id={id}
                name={name}
                kcal={kcal}
                time={time}
                image={imageURL}
                onSelectRecipe={() => {
                    // เขียนโค้ดเพิ่ม
                    props.navigation.navigate("MenuDetail", { id, name, kcal, time, ingredient_quantity, ingredient_name, ingredient_type, steps, imageURL, originalURL,carbs, protein, fats,})
                  }}
                />
            </View>
        ) 
    }
    // ----------------- store ค่า แคลทั้งหมด ----------------------------
      // const toggleEatKcalsHandler = (kcals) => {
      // console.log(kcals)
      // dispatch(toggleEatKcals(kcals))
  
      // }
      // toggleEatKcalsHandler(sumKcals)
      // dispatch(toggleEatKcals(sumKcals))
      // console.log("----- kcal : ", useSelector((state) => state.recipes.sumEatKcals))
      
   return (
      <View  style={styles.container}>
        <View style={styles.headBox}>
          <Text style={styles.headText}>แคลอรี่ที่ได้รับ : {props.listData.length ? sumKcals : 0} kcals.</Text>
        </View>
        
        <View style={styles.list}>
          
          <FlatList
            style={{ width: "100%", height: "100%" }}
            data={props.listData}
            renderItem={renderRecipeItem}
            // kcals={props.parentCallback(sumKcals)}
          />
          
        </View>
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
        list: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        headText:{
          fontSize: 15,
          fontWeight: "bold",
          color: "#000",
          // marginLeft: 10
        },
        headBox:{
          // backgroundColor: "#e4efe3",
          //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
          marginTop: 10,
          alignItems: "flex-start",
          padding: 10
        },
      });

export default RecipeMealList;