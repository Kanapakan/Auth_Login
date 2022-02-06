import React, {useState, useEffect} from "react";
import {KeyboardAvoidingView, StyleSheet, ScrollView, ActivityIndicator, View,Text, Image, TextInput, TouchableOpacity, useWindowDimensions, Dimensions,Animated, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import  {firebase} from '../database/firebaseDb'
const db = firebase.firestore()

const ChangeUserDetail = ({navigation, route}) => {
    const[key, setKey] = useState("");
    const[userId, setUserId] = useState("");
    const[gender, setGender] = useState("");
    const[age, setAge] = useState(0);
    const[height, setHeight] = useState(0);
    const[weight, setWeight] = useState(0);
    const[activity, setActivity] = useState("");
    const[email, setEmail] = useState('')
    const[oldPassword, setOldPassword] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[isLoading, setisLoading] = useState(true);
    const userKey = route.params.userKey;
    const [showTab1, setShowTab1] = useState(true)

  // -------------------- จัดแถบข้างบน -----------------------------]
    
    let bmr;
    let dailyCalVal;
    let dailyCal;
    
    switch (activity) {
        case "ออกกำลังกายน้อยมาก":
            dailyCalVal = 1.2;
          break;
        case "ออกกำลังกายน้อย":
            dailyCalVal =1.375;
          break;
        case "ออกกำลังกายปานกลาง":
            dailyCalVal = 1.55;
          break;
        case "ออกกำลังกายอย่างหนัก":
            dailyCalVal = 1.725;
          break;
        case "เป็นนักกีฬาหรือใช้แรงงานหนัก":
            dailyCalVal = 1.9;
          break;  
      }

    useEffect(() => {
      // console.log("load")
      
        const dbRef = db.collection('userDetail').doc(userKey);

        dbRef.get().then((res) => {
            //check ว่ามีข้อมูลอยู่ใน Doc ไหม
            if (res.exists){
              //ดึงค่าออกมาจาก firebase
                const user = res.data();
                setKey(res.id),
                setUserId(user.userId),
                setEmail(user.email),
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
            
      }, []);


      //update ข้อมูล
    const updateUser = () => {
      setisLoading(true);
          if(gender == "ชาย"){
              bmr = parseInt((66 + (13.7* weight) + (5 * height) - (6.8 * age)));
              dailyCal = parseInt(bmr*dailyCalVal);              
          } else if(gender == "หญิง") {
              bmr = parseInt((665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)));
              dailyCal = parseInt(bmr*dailyCalVal);
          }

        setisLoading(true);
        const updateDBRef = db.collection('userDetail').doc(userKey);
        updateDBRef.set({
            userId: userId,
            gender: gender,
            email: email,
            age: age,
            height: height,
            weight: weight,
            activity: activity,
            BMR: bmr,
            TDEE: dailyCal
        }).then(() => {
            setKey(''),
            setUserId(''),
            setGender(''),
            setAge(0),
            setHeight(0),
            setWeight(0),
            setActivity(""),
            setisLoading(false)
            Alert.alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
            navigation.navigate('MyProfile');
        })
        .catch((err) => {
            console.log("Error:", err),
            setisLoading(false)
        })
  }


  // ----------- แก้ไขรหัสผ่าน -----------
  const reauthrnticate = (currentPass) =>{
     const user = firebase.auth().currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPass);
      // console.log(cred)
      return user.reauthenticateWithCredential(cred);
  }


    const updatePassword = (oldPassword, newPassword) => {
      setisLoading(true);
      reauthrnticate(oldPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updatePassword(newPassword)
        .then(() => {
          setisLoading(false)
          Alert.alert("เปลี่ยนรหัสผ่านสำเร็จ")
            console.log("Edit Password success!");
            navigation.navigate('MyProfile');
      })
      .then(() => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
      })
      

    })
    .catch((err) => {
      Alert.alert("รหัสผ่านเก่าไม่ถูกต้อง")
      setisLoading(false)
      console.log("Error:", err)
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
  })
    
  }


  if (isLoading) {
    return (
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#547F53" />
            <Text>กรุณารอสักครู่</Text>
        </View>
    )
}

  return(
    <View style={styles.container}>
        <View
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // marginTop: 40,
              // marginBottom: 20,
              height: 50,
              position: "relative"
            }}
          >
                  {/* ----------------------- Tab1 --------------------------------- */}      
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 3,
                borderBottomColor: showTab1 == true ? "#547F53" : "#fff",
                backgroundColor:  "#fff",

              }}
              onPress={() => setShowTab1(true)}
            >
              <Text
                style={{
                  color: showTab1 == true ? "#000" : "#adacac",
                  fontSize: 16
                }}
              >
                ข้อมูลส่วนตัว
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 3,
                borderBottomColor: showTab1 == false ? "#547F53" : "#fff",
                backgroundColor:  "#fff",
              }}
              onPress={() => setShowTab1(false) }

            >
              <Text
                style={{
                  color: showTab1 == false ? "#000" : "#adacac",
                  fontSize: 16
                }}
              >
                ข้อมูลเข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          {showTab1 ? <KeyboardAvoidingView style={styles.container}>
            {/* ----------------------- Tab2 --------------------------------- */}
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
          style={styles.Box2}
          placeholder="อายุ"
          keyboardType="numeric"
          value={age}
          onChangeText = {setAge}
        />
  
        <Text style={styles.btnTextAll}>ส่วนสูง</Text>
        <TextInput
            style={styles.Box2}
            placeholder="ส่วนสูง"
            keyboardType="numeric"
            value={height}
            onChangeText = {setHeight}
        />
         <Text style={styles.btnTextAll}>น้ำหนัก</Text>  
        <TextInput
          style={styles.Box2}
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
              onValueChange={(itemValue, itemIndex) => setActivity(itemValue)} >
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
      </KeyboardAvoidingView> : 

      // ----------------------- Tab 2 --------------------------------------
      <View style={styles.container}>
      <View style={styles.headBox} >
        <Text style={styles.headText}>ข้อมูลเข้าสู่ระบบ</Text>
      </View>
      <Text style={styles.btnTextAll2}>อีเมลผู้ใช้</Text>

      <View style={styles.Box}>
        <Text style={styles.BoxText}>{email}</Text>
      </View >
      

      <Text style={styles.btnTextAll2}>รหัสผ่านเก่า</Text>
      <TextInput
        style={styles.Box}
        placeholder="รหัสผ่านเก่า"
        keyboardType="default"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      

    <Text style={styles.btnTextAll2}>รหัสผ่านใหม่</Text>
    <TextInput
        style={styles.Box}
        placeholder="รหัสผ่านใหม่"
        keyboardType="default"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {newPassword.length < 6 ? (
        <Text style={{color: "red", paddingLeft: "50%", marginTop: 3, marginBottom: -15 }}>
          ความยาวอย่างน้อย 6 ตัวอักษร
        </Text>) : null}
    <Text style={styles.btnTextAll2}>ยืนยันรหัสผ่านใหม่</Text>
    <TextInput
        style={styles.Box}
        placeholder="ยืนยันรหัสผ่านใหม่"
        keyboardType="default"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {newPassword !== confirmPassword ? (
        <Text style={{color: "red", paddingLeft: "50%", marginTop: 3, }}>
          กรุณาใส่รหัสยืนยันที่ถูกต้อง 
        </Text>) : null}
    <View style={{alignItems: "center" , marginTop: 35, }}>
      <TouchableOpacity 
        onPress={() => updatePassword(oldPassword, newPassword)}
        style={styles.btnSave}>
        <Text style={styles.btnSaveText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  </View>}

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
    // marginTop: 20,
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
    marginTop: 35
  },
  btnTextAll2: {
    fontSize: 18,
    color: "#000",
    marginLeft: 30,
    marginTop: 35
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
    marginLeft: 200,
    width: "50%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
    
  },
  BoxText:{
    marginTop: 6,
    height: 45,
    borderColor: '#adacac',
    fontSize: 18,
    textAlign: "center",
  },
  pickerBorder2:{
    width: "50%",
    height: 45,
    marginTop: -30,
    marginLeft: 150, 
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
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
    
  }

});
export default ChangeUserDetail;