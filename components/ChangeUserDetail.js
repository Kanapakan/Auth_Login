import React, {useState, useEffect} from "react";
import {KeyboardAvoidingView, StyleSheet, ScrollView, ActivityIndicator, View,Text, Image, TextInput, TouchableOpacity, useWindowDimensions} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
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
    const[email, setEmail] = useState('')
    // const[password, setPassword] = useState('')
    const[isLoading, setisLoading] = useState(true);
    const userKey = route.params.userKey;

  // -------------------- จัดแถบข้างบน -----------------------------
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'ข้อมูลส่วนตัว' },
      { key: 'second', title: 'ข้อมูลเข้าสู่ระบบ' },
      ]);

    
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
      console.log("load")
      
        const dbRef = db.collection('userDetail').doc(userKey);

        dbRef.get().then((res) => {
            //check ว่ามีข้อมูลอยู่ใน Doc ไหม
            console.log(userKey);
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
            return () => {
                // unsubscribe();
                
            }
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
            console.log("Edit success!");
            navigation.navigate('MyProfile');
        })
        .catch((err) => {
            console.log("Error:", err),
            setisLoading(false)
        })
  }


  // --------------------หน้าแรก-----------------------------
  const FirstRoute = () => (
    <KeyboardAvoidingView style={styles.container}>
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
          value={age.toString()}
          onChangeText = {text => setAge(text)}
        />
  
        <Text style={styles.btnTextAll}>ส่วนสูง</Text>
        <TextInput
            style={styles.Box2}
            placeholder="ส่วนสูง"
            keyboardType="numeric"
            value={height.toString()}
            onChangeText = {setHeight}
        />
         <Text style={styles.btnTextAll}>น้ำหนัก</Text>  
        <TextInput
          style={styles.Box2}
          placeholder="น้ำหนัก"
          keyboardType="numeric"
          value={weight.toString()}
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
  
      </KeyboardAvoidingView>
  );

    // --------------------แถบ 2-----------------------------
  const SecondRoute = () => (
    // ข้อมูลเข้าสู่ระบบ
    <View style={styles.container}>
      <View style={styles.headBox} >
        <Text style={styles.headText}>ข้อมูลเข้าสู่ระบบ</Text>
      </View>
      <Text style={styles.btnTextAll}>ชื่อผู้ใช้</Text>

      <TextInput
        style={styles.Box}
        placeholder="ชื่อผู้ใช้"
        keyboardType="email-address"
        value={email}
        disabled={true}
        //onChangeText={}
      />

      <Text style={styles.btnTextAll}>รหัสผ่านเก่า</Text>
      <TextInput
        style={styles.Box}
        placeholder="รหัสผ่านเก่า"
        keyboardType="default"
        secureTextEntry={true}
        //value={}
        //onChangeText={}
      />

    <Text style={styles.btnTextAll}>รหัสผ่านใหม่</Text>
    <TextInput
        style={styles.Box}
        placeholder="รหัสผ่านใหม่"
        keyboardType="default"
        secureTextEntry={true}
        //value={}
        //onChangeText={}
      />
    <Text style={styles.btnTextAll}>ยืนยันรหัสผ่านใหม่</Text>
    <TextInput
        style={styles.Box}
        placeholder="ยืนยันรหัสผ่านใหม่"
        keyboardType="default"
        secureTextEntry={true}
        //value={}
        //onChangeText={}
      />
    <View style={{alignItems: "center" , marginTop: 30,}}>
      <TouchableOpacity 
        // onPress={} 
        style={styles.btnSave}>
        <Text style={styles.btnSaveText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
  
    // -------------------- render หน้า -----------------------------
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    });
  
    const renderTabBar = props => (
      <TabBar
          {...props}
          activeColor={'black'}
          inactiveColor={'gray'}
          borderColor={'#547F53'}

            style={{backgroundColor:"white"}}
      />
    );


  if (isLoading) {
    return (
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#547F53" />
            
        </View>
    )
}

  return(
    <TabView
      	navigationState={{ index, routes }}
      	renderScene={renderScene}
      	renderTabBar={renderTabBar}
      	onIndexChange={setIndex}
      	initialLayout={{ width: layout.width }}
  	/>
    
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
    marginLeft: 200,
    width: "40%",
    height: 45,
    borderColor: '#adacac',
    borderWidth: 2,
    borderRadius: 10,
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