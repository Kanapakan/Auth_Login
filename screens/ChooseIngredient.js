import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements'


const ChooseIngredient  = ({route, navigation},props) =>  {
  const {checkedVegan, checkedGluten, checkedEgg, checkedDaily, checkedNut, checkedSea} = route.params;
//ทดลองของเนื้อ ฝั้งซ้าย 
const [checked1, setchecked1] = useState(false);
//ทดลองของเนื้อ ฝั้งขวา
const [checked2, setchecked2] = useState(false);

//ทดลองของผัก ฝั้งซ้าย 
const [checked3, setchecked3] = useState(false);
//ทดลองของผัก ฝั้งขวา
const [checked4, setchecked4] = useState(false);

  return (    
    // เลือกวัตถุดิบ
    
        <View style={styles.container}>

        <View style={{flex:3.4}}>
          <ScrollView>
           
            {/* container ของเนื้อ และผลิตภัณฑ์จากสัตว์ */}
            <Text style={styles.headerText}>เนื้อ และผลิตภัณฑ์จากสัตว์</Text>
              {/* checkbox ทั้ง 2 ฝั้ง */}
              {!checkedVegan ? (
              <View style={styles.pararellContainer}>

                {/* checkbox 1 อัน ฝั่งซ้าย */}
                
                  <View style={styles.checkboxContainer}>

                  <View style={styles.checkContainer}>
                      <CheckBox
                          checked={checked1}
                          onPress={() => setchecked1(!checked1)}
                          checkedColor='#547f53'
                      />
                  </View>
                      
                      <Text style={styles.ingredientName}>ไก่</Text>

                  </View>


                {/* checkbox 1 อัน ฝั่งขวา */}
                {!checkedSea ? (
                  <View style={styles.checkboxContainer}>

                  <View style={styles.checkContainer}>
                      <CheckBox
                          checked={checked2}
                          onPress={() => setchecked2(!checked2)}
                          checkedColor='#547f53'
                      />
                  </View>

                      <Text style={styles.ingredientName}>ปู</Text>
    
               </View>
                ) : null}
                
            </View>
             ) :null }
            {!checkedVegan ? (
            <View style={styles.pararellContainer}>
                <View style={styles.checkboxContainer}>

                  <View style={styles.checkContainer}>
                    <CheckBox
                      // checked={}
                      // onPress={}
                      checkedColor='#547f53'
                    />
                  </View>
    
                <Text style={styles.ingredientName}>หมู</Text>
                </View>
                {!checkedSea ? (
                  <View style={styles.checkboxContainer}>

                  <View style={styles.checkContainer}>
                      <CheckBox
                          // checked={}
                          // onPress={}
                          checkedColor='#547f53'
                      />
                  </View>

                      <Text style={styles.ingredientName}>ปลา</Text>
    
               </View>
                ) : null}
                
            
            </View>
            ) :null }
            
            {!checkedVegan ? (
            <View style={styles.pararellContainer}>
              {!checkedSea ? (
                <View style={styles.checkboxContainer}>

                <View style={styles.checkContainer}>
                  <CheckBox
                    // checked={}
                    // onPress={}
                    checkedColor='#547f53'
                  />
                </View>
  
              <Text style={styles.ingredientName}>กุ้ง</Text>
              </View>
              ):null}
                

                <View style={styles.checkboxContainer}>

                    <View style={styles.checkContainer}>
                        <CheckBox
                            // checked={}
                            // onPress={}
                            checkedColor='#547f53'
                        />
                    </View>

                        <Text style={styles.ingredientName}>เนื้อวัว</Text>
      
                 </View>
            
            </View>
            ) :null }

{!checkedVegan ? (
            <View style={styles.pararellContainer}>
              {!checkedEgg ? (
                <View style={styles.checkboxContainer}>

                <View style={styles.checkContainer}>
                  <CheckBox
                    // checked={}
                    // onPress={}
                    checkedColor='#547f53'
                  />
                </View>
  
              <Text style={styles.ingredientName}>ไข่ไก่</Text>
              </View>
              ):null}
                

                <View style={styles.checkboxContainer}>

                    <View style={styles.checkContainer}>
                        <CheckBox
                            // checked={}
                            // onPress={}
                            checkedColor='#547f53'
                        />
                    </View>

                        <Text style={styles.ingredientName}>นม</Text>
      
                 </View>
            
            </View>
            ) :null }

{!checkedVegan ? (
            <View style={styles.pararellContainer}>
                <View style={styles.checkboxContainer}>

                  <View style={styles.checkContainer}>
                    <CheckBox
                      // checked={}
                      // onPress={}
                      checkedColor='#547f53'
                    />
                  </View>
    
                <Text style={styles.ingredientName}>หมึก</Text>
                </View>

                <View style={styles.checkboxContainer}>

                    <View style={styles.checkContainer}>
                        <CheckBox
                            // checked={}
                            // onPress={}
                            checkedColor='#547f53'
                        />
                    </View>

                        <Text style={styles.ingredientName}>หอยแมลงภู่</Text>
      
                 </View>
            
            </View>
            ) :null }

              {/* code เหมือนกับข้างบนนะ แค่ทดลองโชว์เฉยๆ*/}

              {/* container ของผัก และผลไม้ */}
              <Text style={styles.headerText}>ผัก และผลไม้</Text>
              {/* checkbox ทั้ง 2 ฝั้ง */}
                <View style={styles.pararellContainer}>

                  {/* checkbox 1 อัน ฝั่งซ้าย */}
                  <View style={styles.checkboxContainer}>

                    <View style={styles.checkContainer}>
                        <CheckBox
                            checked={checked3}
                            onPress={() => setchecked3(!checked3)}
                            checkedColor='#547f53'
                        />
                    </View>
                        
                        <Text style={styles.ingredientName}>กะเพรา</Text>

                  </View>
                
                  {/* checkbox 1 อัน ฝั่งขวา */}
                  <View style={styles.checkboxContainer}>

                    <View style={styles.checkContainer}>
                        <CheckBox
                            checked={checked4}
                            onPress={() => setchecked4(!checked4)}
                            checkedColor='#547f53'
                        />
                    </View>

                        <Text style={styles.ingredientName}>กะหล่ำปลี</Text>
      
                  </View>

                </View>

          </ScrollView>
        </View>



            <View style={{flex:1, justifyContent:"flex-end",}}>

                <View style={styles.btnContainer}>

                <TouchableOpacity 
                    // onPress={} 
                    style={styles.btnBox1}>
                    <Text style={styles.btnText}>ล้างทั้งหมด</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    // onPress={} 
                    style={styles.btnBox2}>
                    <Image style={styles.img} source={require("../assets/ingredient.png")}/>
                    <Text style={styles.btnText}>: 2</Text>
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: "5%"
  },
  pararellContainer:{
    flexDirection: "row",
    paddingHorizontal: 20,     
},
  checkboxContainer:{
    flex: 0.5,
    flexDirection: "row",
    marginTop: -20
  },
  checkContainer:{
    flex: 0.4,
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