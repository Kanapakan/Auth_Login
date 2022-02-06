import React, { useRef, useState } from "react";
import {KeyboardAvoidingView,Text, View, StyleSheet, Image, TextInput, TouchableOpacity ,ScrollView, Alert, FlatList} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createNewRecipe } from "../store/actions/recipeAction";


const UpdateNewMenu = ({route, navigation},props) =>{
  console.log(route.params.objIn)
  const data = route.params.data
  const[name, setname] = useState(data.name);
  const[time, settime] = useState(data.time);
  const[protein, setprotein] = useState(data.protein);
  const[fats, setfats] = useState(data.fats);
  const[carbs, setcarbs] = useState(data.carbs);
  const[kcal, setkcal] = useState(data.kcal);
  const[imageURL, setimageURL] = useState(data.imageURL);
  const[modal, setmodal] = useState(false);
  const[modal2, setmodal2] = useState(false);
  const[ingred_name, setingred_name] = useState("");
  const[ingredient_quan, setingredient_quan] = useState("");
  const[ingredient_name, setingredient_name] = useState(data.ingredient_name);
  const[ingredient_quantity, setingredient_quantity] = useState(data.ingredient_quantity);
  const[objIn, setObjIn] = useState(route.params.objIn);
  // --------------- วิธีทำ -------------------------
  const[howto, sethowto] = useState("");
  const[steps, setsteps] = useState(data.steps);
  // ---------------- tab --------------------------


  const dispatch = useDispatch();
  // ----------------- กด ปุ่ม add -----------------
  const updateRecipe = () => {
    if (name != "" && time != 0 && protein != 0 && fats != 0 && carbs != 0 && imageURL != "" && ingredient_name != [] && ingredient_quantity != [] && steps != [] && kcal != 0) {
    const newMenu = {
      id: data.id,
      name: name,
      kcal: kcal,
      time: time,
      ingredient_quantity: ingredient_quantity,
      ingredient_name: ingredient_name,
      ingredient_type: [],
      steps: steps,
      imageURL: imageURL,
      originalURL: "",
      carbs: carbs,
      fats: fats,
      protein:protein
    }

    dispatch(createNewRecipe(newMenu, "update"));
    setname("")
    settime(0),
    setkcal(0),
    setingredient_name([]),
    setingredient_quantity([]),
    setsteps([]),
    setcarbs(0),
    setprotein(0),
    setfats(0),
    setimageURL("")
    setObjIn([])
    Alert.alert("แก้ไขเมนูสำเร็จ")
    navigation.navigate('AddMenuScreen');
    }
    else {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน")
    }
  }

  

  const openModal = () => {
    setmodal(true);
    renderFlatList(ingredient_name, ingredient_quantity)
  }
  const openModal2 = () => {
    setmodal2(true);
  }

  const addHowto = (howto) => {
    if(howto != "") {
      const updatelist = [...steps]
      updatelist.push(howto)
      setsteps(updatelist)
      sethowto("")
    } else {
      Alert.alert("กรุณาใส่วิธีทำ")
    }
  }

  const addIngreList = (ingred_name, ingredient_quan) => {
    if(ingred_name != "" && ingredient_quan != ""){
      const ingedient = {
        ingredient_name: ingred_name,
        ingredient_quantity: ingredient_quan
      }
      const objList = [...objIn]
      objList.push(ingedient)
      setObjIn(objList)
      const listname = [...ingredient_name]
      const listquan = [...ingredient_quantity]
      listname.push(ingred_name)
      setingredient_name(listname)
      listquan.push(ingredient_quan)
      setingredient_quantity(listquan)
      
      setingred_name('')
      setingredient_quan("")
      
    } else {
      Alert.alert("กรุณาใส่ข้อมูลวัตถุดิบให้ครบถ้วน")
    }
  }
  
  const delIngedient = (item) => {
    const index = objIn.findIndex(recipe => recipe == item)
    const indexNameList = ingredient_name.findIndex(recipe => recipe == item.ingredient_name)
    const indexQuanList = ingredient_name.findIndex(recipe => recipe == item.ingredient_quantity)
    const updateobjIn = [...objIn];
    const updateobjInName= [...ingredient_name];
    const updateobjInQuan= [...ingredient_quantity];
    updateobjIn.splice(index, 1);
    updateobjInName.splice(indexNameList, 1)
    updateobjInQuan.splice(indexQuanList, 1)
    
    setObjIn(updateobjIn)
    setingredient_name(updateobjInName)
    setingredient_quantity(updateobjInQuan)
  }
  const delHowto = (howto) => {
    const index = steps.findIndex(recipe => recipe == howto)
    const updatehowto = [...steps];
    updatehowto.splice(index, 1);
    setsteps(updatehowto)
    // console.log("del", howto)
  }
  const renderFlatListHowto = (steps) => {
    // console.log(steps)
    return(
      <FlatList
          data={steps}
          renderItem={({ item, index}) => (
            <View style={styles.checkContainer}>
                <Text style={styles.ingredientName}>{index+1}. {item}</Text>
                {/* <Text style={styles.ingredientName}>{data}</Text> */}
                <TouchableOpacity onPress={() => delHowto(item)}>
                  <Ionicons name="ios-trash-bin-sharp" color="#000" style={styles.delIngredient} />
                </TouchableOpacity>
           </View>
          
          )}
    />
    )
    
  }

  const renderFlatList = (ingredient_name, ingredient_quantity, objIn) => {
    return(
      <FlatList
      
          data={objIn}
          renderItem={({ item}) => (
            <View style={styles.checkContainer}>
                <Text style={styles.ingredientName}>{item.ingredient_name}</Text>
                <Text style={styles.ingredientName}>{item.ingredient_quantity}</Text>
                <TouchableOpacity onPress={() => delIngedient(item)}>
                  <Ionicons name="ios-trash-bin-sharp" color="#000" style={styles.delIngredient} />
                </TouchableOpacity>
           </View>
          
          )}
    />
    )
  }

  return(
    <View style={styles.container}>
      {/* ------------------ Modal 1 --------------------------- */}
        <Modal
          transparent={true}
          isVisible={modal}
          style={{
            flex: 1,
            margin: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: 500, //Fixed View size
              width: 350, //Fixed View size
              backgroundColor: "#fff",
              
            }}
          >
            <TouchableOpacity >
              <Ionicons name="close" size={27} color="black" style={{marginTop: 10, paddingLeft: 300}} onPress={() => setmodal(false)} />
            </TouchableOpacity>
            
              <Text style={{ color: "#4A6D7C",fontSize: 20, textAlign: "center",fontWeight: "bold"}}>
              แก้ไขวัตถุดิบของคุณ
            </Text>

            <View style={styles.containermodal}>
              <View style={{ flex: 1, flexDirection: "row"}}>
                <View style={{ flex: 1}}>
                  <Text style={styles.headerText}>วัตถุดิบ</Text>
                  <TextInput
                      style={styles.boxModal}
                      placeholder="ชื่อวัตถุดิบ"
                      keyboardType="default"
                      value={ingred_name}
                      onChangeText={setingred_name}
                    />
                </View>
               
                <View style={{ flex: 1}}>
                  <Text style={styles.headerText}>ปริมาณ</Text>
                    <TextInput
                        style={styles.boxModal2}
                        placeholder="ปริมาณ"
                        keyboardType="default"
                        value={ingredient_quan}
                        onChangeText={setingredient_quan}
                      />
                </View>    
              </View>

                    <TouchableOpacity onPress={() => addIngreList(ingred_name, ingredient_quan)}
                      style={styles.btnAddIng}>
                      <Text style={{fontSize: 18,
                        color: "#fff",
                        fontWeight: "bold",
                        alignSelf: "center"}}>เพิ่ม</Text>
                  </TouchableOpacity>
                 
            </View>
            <View style={{flex: 3.4 }}>               
                    <View style={styles.square}>                      
                        {renderFlatList(ingredient_name, ingredient_quantity, objIn)}                   
                    </View>
            
                </View>
              
          </View>
        </Modal>

        {/* ------------------ Modal 2 --------------------------- */}
        <Modal
          transparent={true}
          isVisible={modal2}
          style={{
            flex: 1,
            margin: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: 500, //Fixed View size
              width: 350, //Fixed View size
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "#fff",
              
            }}
          >
            <TouchableOpacity >
              <Ionicons name="close" size={27} color="black" style={{marginTop: 10, paddingLeft: 300}} onPress={() => setmodal2(false)} />
            </TouchableOpacity>
            
              <Text style={{ color: "#4A6D7C",fontSize: 20, textAlign: "center",fontWeight: "bold"}}>
              แก้ไขวิธีทำอาหาร
            </Text>

            <View style={styles.containermodal}>
              <View style={{ flex: 1, flexDirection: "row"}}>
                <View style={{ flex: 1}}>
                  <Text style={styles.headerText}>วิธีทำ</Text>
                  <TextInput
                      style={styles.boxModal}
                      placeholder="วิธีทำ"
                      keyboardType="default"
                      value={howto}
                      onChangeText={sethowto}
                    />
                </View>
               
                
              </View>

                    <TouchableOpacity onPress={() => addHowto(howto)}
                      style={styles.btnAddIng}>
                      <Text style={{fontSize: 18,
                        color: "#fff",
                        fontWeight: "bold",
                        alignSelf: "center"}}>เพิ่ม</Text>
                  </TouchableOpacity>
                 
            </View>
            <View style={{flex: 3.4 }}>               
                    <View style={styles.square}>                      
                        {renderFlatListHowto(steps)}                   
                    </View>
            
                </View>
              
          </View>
        </Modal>


      <View style={styles.container}>
      
      <Text style={styles.btnTextAll}>ชื่อเมนูอาหาร</Text>
      <TextInput
        style={styles.Box}
        placeholder="ชื่อเมนูอาหาร"
        keyboardType="default"
        value={name}
        onChangeText={setname}
      />

      <Text style={styles.btnTextAll}>เวลาการทำ</Text>
      <TextInput
        style={styles.Box}
        placeholder="เวลาการทำ(นาที)"
        keyboardType="numeric"
        value={time}
        onChangeText={settime}
      />

    <Text style={styles.btnTextAll}>วัตถุดิบ</Text>
      <TouchableOpacity 
           onPress={() => openModal()}
          style={styles.btnOpenAddIn}>
          <Text style={styles.btnSaveText}>แก้ไขวัตถุดิบ</Text>
        </TouchableOpacity>
    <Text style={styles.btnTextAll}>วิธีทำ</Text>
    <TouchableOpacity 
           onPress={() => openModal2()}
          style={styles.btnOpenAddIn}>
          <Text style={styles.btnSaveText}>แก้ไขวิธีทำ</Text>
        </TouchableOpacity>
    
        <Text style={styles.btnTextAll}>สารอาหาร(กรัม)</Text>
        <View style={{  flexDirection: "row", paddingLeft: 170}}>
          <TextInput
        style={styles.Box1}
        placeholder="โปรตีน"
        keyboardType="numeric"
        value={protein}
        onChangeText={setprotein}
      />
      <TextInput
        style={styles.Box1}
        placeholder="คาร์บ"
        keyboardType="numeric"
        value={carbs}
        onChangeText={setcarbs}
      />
      <TextInput
        style={styles.Box1}
        placeholder="ไขมัน"
        keyboardType="numeric"
        value={fats}
        onChangeText={setfats}
      />
        </View>
        
        <Text style={styles.btnTextAll}>ปริมาณพลังงาน</Text>
        <TextInput
        style={styles.Box}
        placeholder="แคลอรี่(กิโลแคลอรี่)"
        keyboardType="numeric"
        value={kcal}
        onChangeText={setkcal}
      />
      <Text style={styles.btnTextAll}>ลิงก์รูปภาพ</Text>
        <TextInput
        style={styles.Box}
        placeholder="Url รูปภาพ"
        keyboardType="default"
        value={imageURL}
        onChangeText={setimageURL}
      />
    <View style={{alignItems: "center" , marginTop: 30, marginBottom: 30}}>
      <TouchableOpacity 
        onPress={() => updateRecipe()} 
        style={styles.btnSave}>
        <Text style={styles.btnSaveText}>แก้ไขข้อมูล</Text>
      </TouchableOpacity>
    </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  headerText:{
    fontSize: 18,
    color: "#8ec18d",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center"
  },
  containermodal:{
    // flexDirection: "column",
    // flex: 1,
    backgroundColor: "#fff",
  },
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
    marginLeft: 30
  },
  btnTextAll: {
    fontSize: 18,
    color: "#000",
    marginLeft: 25,
    marginTop: 30
  },
  pickerBorder:{
    width: "40%",
    height: 45,
    marginTop: -35,
    marginLeft: 150,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
  },
  Box:{
    marginTop: -35,
    marginLeft: 170,
    width: "50%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
  Box1:{
    // flex: 1,
    marginTop: -35,
    marginRight: 5,
    width: "27%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
  boxModal:{
    marginLeft: 10,
    width: "95%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    // justifyContent: "center",
    textAlign: "center",
  },
  boxModal2:{
    marginLeft: 15,
    width: "80%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    // justifyContent: "center",
    textAlign: "center",
  },
  btnSave: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnOpenAddIn: {
    marginTop: -35,
    marginLeft: 170,
    width: "50%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnAddIng: {
    width: "30%",
    // elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 5,
    alignSelf: "center",
    marginTop: 75,
    // paddingHorizontal: 20,
  },
  btnSaveText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  Box2:{
    marginTop: -35,
    marginLeft: 150,
    width: "40%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
  pickerdropdown:{
    fontFamily: 'serif',
    fontSize: 18,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // borderWidth: 2,
    // borderColor: '#8ec18d',
    color: "#adacac",
    // fontWeight: "bold",
    // borderRadius: 8,
    // borderStyle: "hidden",
    // marginTop: 5,
    // padding: 5,
    marginTop: -5,
    textAlign: "center",
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
},
headText2:{
  fontSize: 15,
      fontWeight: "bold",
      color: "#000",
      marginTop: 10,
      marginLeft: 10
}

}); 

export default UpdateNewMenu;