import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements'
import { SegmentedControlIOSBase } from "react-native";
import { and } from "react-native-reanimated";
const data = require('../dataJson/menu.json');

 const sensitiveType = [

  {id:1, txt: "มังสวิรัติ", isChecked: false},
  {id:2, txt: "ปราศจากผลิตภัณฑ์จากน้ำตาล", isChecked: false},
  {id:3, txt: "ปราศจากผลิตภัณฑ์จากทะเล", isChecked: false},

];

const FilterIngredient  = ({navigation}, props) =>  {
  const [filtered, setfiltered] = useState(data)
  const [senType, setsenType] = useState(sensitiveType)
  const [check, setcheck] = useState(false)

  

  const handleChange = (id) => {

    let temp = senType.map((item) => {
      if (id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setsenType(temp);


      

      // if(senType[0].isChecked == false && senType[1].isChecked == false){

      //   filtered.map((ele) => {
  
      //     if(ele.type == "meat" || ele.isGluten == true){
      //       menu.splice(menu.indexOf(ele), 1)
      //     }
  
      //   })
      //   setfiltered(menu)
      // }
      // if(senType[1].isChecked == false && senType[2].isChecked == false){
      //   filtered.map((ele) => {
  
      //     if(ele.isSeafood == true || ele.isGluten == true){
      //       menu.splice(menu.indexOf(ele), 1)
      //     }
  
      //   })
      //   setfiltered(menu)
      // }
      
      

      

  };

    const confirm = () => {

      let menu = [...filtered]

      if(senType[0].isChecked == false && senType[1].isChecked == false && senType[2].isChecked == false){
        setfiltered(data)
      }
      if(senType[0].isChecked == true && senType[1].isChecked == false && senType[2].isChecked == false){
        filtered.map((ele) => {
  
          if(ele.type == "meat"){
            menu.splice(menu.indexOf(ele), 1)
            setfiltered(menu)
          }
        })
      }
       if(senType[0].isChecked == false && senType[1].isChecked == true && senType[2].isChecked == false){
        filtered.map((ele) => {
  
          if(ele.isGluten == true){
            menu.splice(menu.indexOf(ele), 1)
            setfiltered(menu)

          }
  
        })
      }
       if(senType[0].isChecked == false && senType[1].isChecked == false && senType[2].isChecked == true){
        filtered.map((ele) => {
  
          if(ele.isSeafood == true){
            menu.splice(menu.indexOf(ele), 1)
            setfiltered(menu)

          }
  
        })
      }
       if(senType[0].isChecked == false && senType[1].isChecked == true && senType[2].isChecked == true){
        filtered.map((ele) => {
  
          if(ele.isSeafood == true || ele.isGluten == true){
            menu.splice(menu.indexOf(ele), 1)
            setfiltered(menu)

          }
  
        })
      }
       if(senType[0].isChecked == true && senType[1].isChecked == true && senType[2].isChecked == false){
        filtered.map((ele) => {
  
          if(ele.isGluten == true || ele.type == "meat"){
            menu.splice(menu.indexOf(ele), 1)
            setfiltered(menu)

          }
  
        })
      }
      
      // Alert.alert(
      //   "ยืนยันการเลือก?",
      //   "",
      //   [
      //     {
      //       text: "Cancel"
      //     },
      //     { text: "OK", onPress: () => setcheck(true) }
      //   ],
      //   {
      //     cancelable: true,
      //   }
      // );

      // let temp =  senType.map((sen) => {
      //     return { ...sen, isChecked: false };
      // });

      // setsenType(temp)
    
      setcheck(true)
    }


    const renderFlatList = (renderData) => {
      return(
        <FlatList
            data={renderData}
            renderItem={({ item }) => (
            
              <View style={styles.checkboxContainer}>

                <View style={styles.checkContainer}>
                  <CheckBox
                    checked={item.isChecked}
                    onPress={() => {
                      handleChange(item.id);
                    }}
                    checkedColor='#547f53'
                  />
                </View>

                  <Text style={styles.typeSensitive}>{item.txt}</Text>

              </View>
            )}
      />
      )
    }

    const next = () => {
      navigation.navigate("ChooseIngredient", {filtered: filtered})
      setcheck(false)
    }
    

  return (
    
    
        <View style={styles.container}>
    
            <Text style={styles.sensitiveText}>การกรอง</Text>


            {renderFlatList(senType)}

           
            
              {!check ? (
                <View style={{ justifyContent:"flex-end",alignItems: "center", margin: 20}}>
                <TouchableOpacity 
                    onPress={ () => confirm() }
                    style={styles.btnContainer}>
                    <Text style={styles.btnText}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
              ):null}
            
            {check ? (
              <View style={{ justifyContent:"flex-end",alignItems: "center", margin: 20}}>
              <TouchableOpacity 
                  onPress = {() => next()}
                  style={styles.btnContainer2}>
                  <Text style={styles.btnText}>ถัดไป</Text>
              </TouchableOpacity>
  
          </View>   
            ):null}
                  
        </View>
      )      



};
    
    const styles = StyleSheet.create({
      container: {
    //     flexDirection: "column",
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

// css ของหน้าค้นหาด้วยตัวเอง
  sensitiveText:{
    fontSize: 23,
    fontWeight: "bold",
    color: "#547f53",
    alignSelf: "center",
    padding: 20
  },
  btnContainer: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnContainer2: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#00A316",
    borderRadius: 10,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  checkboxContainer:{
    flexDirection: "row",
    paddingHorizontal: "2%",
    marginVertical: -7
  },
  checkContainer:{
    flex: 0.15,
  },
  typeSensitive:{
    flex: 1,
    fontSize: 20,
    color: "#547f53",
    alignSelf: "center",
    flexDirection: "row"
  },
  checkContainer2:{
    flex: 1,
  },
  typeSensitive2:{
    flex: 1,
    fontSize: 20,
    color: "#547f53",
    alignSelf: "center",
    flexDirection: "row"
  },
  textInputBox:{
    flex: 2,
    marginHorizontal: 10,
    alignSelf: "center",
    fontSize: 20,
    color: "#547f53",
    borderRadius: 10,
    borderColor: "#8ec18d",
    borderWidth: 2,
    height: 40,
    textAlign: "center",
  }
    
    });

    export default FilterIngredient;