import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View,Text, Image, TextInput, TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import  db from '../database/firebaseDb'
import { auth } from '../database/Auth';

const ChangeUserDetail = ({navigation, route}) => {
    const[key, setKey] = useState("");
    const[userId, setUserId] = useState("");
    const[gender, setGender] = useState("");
    const[age, setAge] = useState(0);
    const[height, setHeight] = useState(0);
    const[weight, setWeight] = useState(0);
    const[activity, setActivity] = useState("");
    const[isLoading, setisLoading] = useState(true);
    const userKey = route.params.userKey;

    useEffect(() => {
        const dbRef = db.collection('userDetail').doc(userKey);
        dbRef.get().then((res) => {
            //check ว่ามีข้อมูลอยู่ใน Doc ไหม
            console.log(userKey);
            if (res.exists){
                const user = res.data();
                setKey(res.id),
                setUserId(user.userId),
                setGender(user.gender),
                setAge(user.age),
                setHeight(user.height),
                setWeight(user.weight),
                setActivity(user.activity),
                setisLoading(false)
            } else {
                console.log('Document does not exist!');
            }
        })
            return () => {
                // unsubscribe();
                
            }
      }, []);

      const updateUser = () => {
        setisLoading(true);
        const updateDBRef = db.collection('userDetail').doc(userKey);
        updateDBRef.set({
            userId: userId,
            gender: gender,
            age: age,
            height: height,
            weight: weight,
            activity: activity
        }).then(() => {
            setKey(''),
            setUserId(''),
            setGender(''),
            setAge(0),
            setHeight(0),
            setWeight(0),
            setActivity(""),
            setisLoading(false)
            console.log("แก้ไขสำเร็จ");
            navigation.navigate('MyProfile');
        })
        .catch((err) => {
            console.log("Error:", err),
            setisLoading(false)
        })
  }


  if (isLoading) {
    return (
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#547F53" />
            
        </View>
    )
}

    return(
        <View style={styles.container}>
      <View style={styles.headBox} >
        <Text style={styles.headText}>ข้อมูลส่วนตัว</Text>
      </View>
      <Text style={styles.btnTextAll}>เพศ</Text>
      <View style={styles.pickerBorder}>
        <Picker
            // value={gender}
            selectedValue={gender}
            style={styles.pickerdropdown}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            {/* อย่าลืม disable  และจัดให้ตรงกลาง*/}
            <Picker.Item label="เพศ" />
            <Picker.Item label="ชาย" value="ชาย" />
            <Picker.Item label="หญิง" value="หญิง" />
        </Picker>
      </View>

      <Text style={styles.btnTextAll}>อายุ</Text>
      <TextInput
        style={styles.Box}
        placeholder="อายุ"
        keyboardType="numeric"
        value={age}
        onChangeText = {setAge}
      />

      <Text style={styles.btnTextAll}>ส่วนสูง</Text>
      <TextInput
          style={styles.Box}
          placeholder="ส่วนสูง"
          keyboardType="numeric"
          value={height}
          onChangeText = {setHeight}
      />
       <Text style={styles.btnTextAll}>น้ำหนัก</Text>  
      <TextInput
        style={styles.Box}
        placeholder="น้ำหนัก"
        keyboardType="numeric"
        value={weight}
        onChangeText = {setWeight}
      />


        <Text style={styles.btnTextAll}>พฤติกรรม</Text>  
        <View style={styles.pickerBorder2}>
        <Picker
            selectedValue={activity}
            style={styles.pickerdropdown}
            onValueChange={(itemValue, itemIndex) => setActivity(itemValue)}
                    
                    >
                    {/* อย่าลืม disable  และจัดให้ตรงกลาง*/}
                       
            <Picker.Item label="พฤติกรรมการออกกำลังกาย" />
            <Picker.Item label="ออกกำลังกายน้อยมาก" value="ออกกำลังกายน้อยมาก" />
            <Picker.Item label="ออกกำลังกายน้อย (อาทิตย์ละ 1 – 3 วัน)" value="ออกกำลังกายน้อย" />
            <Picker.Item label="ออกกำลังกายปานกลาง (อาทิตย์ละ 3 – 5 วัน)" value="ออกกำลังกายปานกลาง" />
            <Picker.Item label="ออกกำลังกายอย่างหนัก (อาทิตย์ละ 6 – 7 วัน)" value="ออกกำลังกายอย่างหนัก" />
            <Picker.Item label="เป็นนักกีฬาหรือทำงานที่ต้องใช้แรงงานมาก" value="เป็นนักกีฬาหรือใช้แรงงานหนัก" />
                        
        </Picker>
      </View>

      <View style={{alignItems: "center" , marginTop: 30,}}>
        <TouchableOpacity 
            onPress={() => updateUser()}
          style={styles.btnSave}>
          <Text style={styles.btnSaveText}>บันทึก</Text>
        </TouchableOpacity>
      </View>

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
    preloader:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headBox:{
      backgroundColor: "#e3e3e3",
      //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
      marginTop: 20,
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
      marginLeft: 50,
      marginTop: 30
    },
    pickerBorder:{
      width: "25%",
      height: 45,
      borderColor: '#adacac',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: -35,
      marginLeft: 150,
    },
    Box:{
      marginTop: -35,
      marginLeft: 200,
      width: "40%",
      height: 45,
      borderColor: '#adacac',
      borderWidth: 2,
      borderRadius: 10,
      fontSize: 20,
      textAlign: "center",
    },
    pickerBorder2:{
      width: "50%",
      height: 45,
      borderColor: '#adacac',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: -35,
      marginLeft: 150, 
    },
    btnSave: {
      width: "40%",
      elevation: 8,
      backgroundColor: "#8ec18d",
      borderRadius: 10,
      paddingVertical: 10,
      // paddingHorizontal: 20,
    },
    btnSaveText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
  
  });
export default ChangeUserDetail;