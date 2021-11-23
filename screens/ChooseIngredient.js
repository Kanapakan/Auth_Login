import React, { useRef, useState, useEffect } from "react";
import {Text, View, StyleSheet, Image, TextInput,FlatList, ScrollView, TouchableOpacity, Alert} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements'

const ChooseIngredient  = ({route, navigation},props) =>  {
  const {filtered} = route.params;
  const [products, setProducts] = useState(filtered.filter((item) => {return item.type == "meat"}));
  const [products2, setProducts2] = useState(filtered.filter((item) => {return item.type == "veg"}))
  const [select, setSelect] = useState([]);

  
  
  const handleChange = (id) => {
    let item = [...select]
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);

    temp.map((ele) => {
      if(id === ele.id && ele.isChecked == true){
        item.push(ele.txt)
      }
      if(id === ele.id && ele.isChecked == false){
        item.splice(item.indexOf(ele.txt), 1)
      }
    })
    setSelect(item)
    
    temp = products2.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts2(temp);

    temp.map((ele) => {
      if(id === ele.id && ele.isChecked == true){
        item.push(ele.txt)
      }
      if(id === ele.id && ele.isChecked == false){
        item.splice(item.indexOf(ele.txt), 1)
      }
    })
    setSelect(item)

  };

  
 

const renderFlatList = (renderData) => {
  return(
    <FlatList
        data={renderData}
        renderItem={({ item }) => (
        
          <View style={styles.checkContainer}>
            <CheckBox
              checked={item.isChecked}
              onPress={() => {
                handleChange(item.id);
              }}
   
              checkedColor='#547f53'
            />
          
           <Text style={styles.ingredientName}>{item.txt}</Text>
         </View>
        )}
  />
  )
}


const clear = () => {
  let temp = products.map((product) => {
      return { ...product, isChecked: false };
  });
  setProducts(temp);
}

const next = () =>{
  if (select.length == 0) {
    Alert.alert(
      "กรุณาเลือกวัตถุดิบ",
      "เลือกวัตถุดิบอย่างน้อย 1 รายการ",
      [
        {
          text: "ok",
          style: "ok",
        },
      ],
      {
        cancelable: false,
      }
    );
  }
  else{
    navigation.navigate("ConfirmIngredient", {select: select})
  }
}

  return (   

    
        <View style={styles.container}>
       
        <View style={{ flex: 1,flexDirection: "row"}}>
    
          <View style={{ flex: 1}}>

          <Text style={styles.headerText}>เนื้อ และผลิตภัณฑ์จากสัตว์</Text>
            {renderFlatList(products)}
          </View>

          <View style={{ flex: 1}}>
          <Text style={styles.headerText}>ผัก และผลไม้</Text>
            {renderFlatList(products2)}
          </View>
          
        </View>
       

       


        <View style={{flex:0.185, justifyContent:"flex-end",}}>

          <View style={styles.btnContainer}>

            <TouchableOpacity 
               onPress={() => clear()} 
              style={styles.btnBox1}>
              <Text style={styles.btnText}>ล้างทั้งหมด</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => next()} 
              style={styles.btnBox2}>
              <Image style={styles.img} source={require("../assets/ingredient.png")}/>
              <Text style={styles.btnText}>ยืนยัน</Text>
    
            </TouchableOpacity>
          </View>

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
  btnContainer:{
    flexDirection: "row",
    backgroundColor: "#e4efe3"
  },
  btnBox1: {
    flex: 1,
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    padding: 15,
    margin: 15
  },
  btnBox2: {
    flexDirection: "row",
    flex: 0.7,
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    padding: 15,
    margin: 15
  },
  btnText: {
    fontSize: 20,
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
// css ของเลือกวัตถุดิบ
  headerText:{
    fontSize: 23,
    fontWeight: "bold",
    color: "#547f53",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: "5%"
  },
  
  checkContainer:{
    flexDirection: "row",
    flex: 1,
    marginTop: -15
  },
  ingredientName:{
    flex: 1,
    fontSize: 20,
    color: "#547f53",
    alignSelf: "center",
    flexDirection: "row"
  },
  img:{
    flex: 1,
    height: "130%",
  }





    
    });
    
export default ChooseIngredient;