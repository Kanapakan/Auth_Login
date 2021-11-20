import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { CheckBox } from 'react-native-elements'


const FilterIngredient  = ({navigation}, props) =>  {
    const [checkedVegan, setcheckedVegan] = useState(false);
    const [checkedGluten, setcheckedGluten] = useState(false);
    const [checkedEgg, setcheckedEgg] = useState(false);
    const [checkedDaily, setcheckedDaily] = useState(false);
    const [checkedNut, setcheckedNut] = useState(false);
    const [checkedSea, setcheckedSea] = useState(false);

    const toNextScreen = () => {
      navigation.navigate("ChooseIngredient", {checkedVegan: checkedVegan, checkedGluten: checkedGluten, checkedEgg: checkedEgg, checkedDaily: checkedDaily, checkedNut: checkedNut, checkedSea: checkedSea})
      setcheckedVegan(false)
      setcheckedGluten(false)
      setcheckedEgg(false)
      setcheckedDaily(false)
      setcheckedNut(false)
      setcheckedSea(false)
    }
  return (
    
    // ค้นหาด้วยตัวเอง
    
        <View style={styles.container}>
        {/* //     <View style={styles.headBox} >
        //         <Text style={styles.headText}>ค้นหาด้วยตัวเอง</Text>
        //     </View> */}
    
            <Text style={styles.sensitiveText}>การแพ้</Text>


            {/* checkbox 1 อัน Vegan */}
            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedVegan}
                  onPress={() => setcheckedVegan(!checkedVegan)}
                  checkedColor='#547f53'
                  // Size='20'
                />
              </View>

              <Text style={styles.typeSensitive}>มังสวิรัติ</Text>

            </View>

            {/* checkbox 1 อัน Gluten free */}
            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedGluten}
                  onPress={() => setcheckedGluten(!checkedGluten)}
                  checkedColor='#547f53'
                  // Size='20'
                />
              </View>

              <Text style={styles.typeSensitive}>ผลิตภัณฑ์จากน้ำตาล</Text>

            </View>

            {/* checkbox 1 อัน Egg free */}
            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedEgg}
                  onPress={() => setcheckedEgg(!checkedEgg)}
                  checkedColor='#547f53'
                  // Size='20'
                />
              </View>

              <Text style={styles.typeSensitive}>ผลิตภัณฑ์จากไข่</Text>
      
            </View>

            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedSea}
                  onPress={() => setcheckedSea(!checkedSea)}
                  checkedColor='#547f53'
                />
              </View>

              <Text style={styles.typeSensitive}>ผลิตภัณฑ์จากทะเล</Text>

            </View>
            
            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedNut}
                  onPress={() => setcheckedNut(!checkedNut)}
                  checkedColor='#547f53'
                />
              </View>

              <Text style={styles.typeSensitive}>ผลิตภัณฑ์จากจากถั่ว</Text>

            </View>

            <View style={styles.checkboxContainer}>

              <View style={styles.checkContainer}>
                <CheckBox
                  checked={checkedDaily}
                  onPress={() => setcheckedDaily(!checkedDaily)}
                  checkedColor='#547f53'
                />
              </View>

              <Text style={styles.typeSensitive}>ผลิตภัณฑ์จากนม</Text>

            </View>
            
  
            <View style={{ justifyContent:"flex-end",alignItems: "center", margin: 20}}>
                <TouchableOpacity 
                    onPress={ () => toNextScreen() }
                    style={styles.btnContainer}>
                    <Text style={styles.btnText}>ต่อไป</Text>
                </TouchableOpacity>
    
            </View>      
          
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