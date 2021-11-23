import React, { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert} from 'react-native'
import { auth } from '../database/Auth'
import  {firebase} from '../database/firebaseDb'
import {Picker} from '@react-native-picker/picker';
// import {connect} from 'react-redux';

const db = firebase.firestore()
 


const RegisterUserDetail = ({navigation, route}, props) => {

    const dbRef = db.collection('userDetail');
    const[userId, setUserId] = useState("");
    const[gender, setGender] = useState("");
    const[age, setAge] = useState(0);
    const[height, setHeight] = useState(0);
    const[weight, setWeight] = useState(0);
    const[activity, setActivity] = useState("");

    const[isLoading, setisLoading] = useState(false);


    
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


    const storeUser = () => {
        if (gender == '' || age <= 0 || height <= 0 || weight <= 0 || activity == '') {
            alert('กรุณาใส่ข้อมูลให้ครบทุกช่อง');
        } else {
            if(gender == "ชาย"){
                bmr = parseInt((66 + (13.7* weight) + (5 * height) - (6.8 * age)));
                dailyCal = parseInt(bmr*dailyCalVal);              
            } else if(gender == "หญิง") {
                bmr = parseInt((665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)));
                dailyCal = parseInt(bmr*dailyCalVal);
            }
            
            setisLoading(true)        
            auth
                .createUserWithEmailAndPassword(route.params.email, route.params.password)
                .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);

                // console.log(props)
            dbRef.add({
                userId: auth.currentUser?.uid,
                email: route.params.email,
                gender: gender,
                age: age,
                height: height,
                weight: weight,
                activity: activity,
                BMR: bmr,
                TDEE: dailyCal
            }).then((res) => {
                setGender(""),
                setAge(0),
                setHeight(0),
                setWeight(0),
                setActivity(""),
                setisLoading(false)
                navigation.navigate('BottomTabScreen');
                //สร้างบัญชีผู้ใช้
            
            })
                
            }).catch((err) => {
                console.log('Error found: ', err);
                setisLoading(false)
            })     
        }
    }
    if(isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#547F53" />
                <Text>กำลังเข้าสู่ระบบ</Text>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
           
           <Image style={styles.leafLeft} source={require("../assets/leaf_left-removebg.png")}/>
                <Text style={styles.baseText} >
                    <Text style={styles.headText}>ข้อมูลส่วนตัว</Text>
                   
                </Text>
           
          
            <View style={{alignItems: "center" , marginTop: 40,}}>
    
                <View style={styles.pickerBorder}>
                    <Picker
                        selectedValue={gender}
                        style={styles.pickerdropdown}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                    
                    >
                    {/* อย่าลืม disable  และจัดให้ตรงกลาง*/}
                        <Picker.Item label="เพศ" />
                        <Picker.Item label="ชาย" value="ชาย" />
                        <Picker.Item label="หญิง" value="หญิง" />
                    </Picker>
                </View>
                
                <TextInput
                    style={styles.Box}
                    placeholder="อายุ"
                    keyboardType={Platform.OS === 'ios' ? "default" : "number-pad"}
                    onChangeText = {setAge}
                />
                <TextInput
                    style={styles.Box}
                    placeholder="ส่วนสูง"
                    keyboardType={Platform.OS === 'ios' ? "default" : "number-pad"}
                    onChangeText = {setHeight}
                />
                <TextInput
                    style={styles.Box}
                    placeholder="น้ำหนัก"
                    keyboardType={Platform.OS === 'ios' ? "default" : "number-pad"}
                    onChangeText = {setWeight}
                />
    
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
                
            </View>
    
            <View style={{alignItems: "center" , marginTop: 50,}}>
                <TouchableOpacity 
                    onPress={() => storeUser()}
                    style={styles.btnContainer}>
                    <Text style={styles.btnText}>ลงทะเบียน</Text>
                </TouchableOpacity>
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
    preloader:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leafLeft: {
      top: 10,
      left: 5,
      height: "25%",
      width: "25%"
  },
    headText:{
      fontSize:35,
      fontWeight: "bold",
      color: "#547f53"
  },
      baseText:{
      // fontFamily: 'Roboto',
      textAlign: "center",
      marginTop: -70
  
    },
    pickerBorder:{
      width: "80%",
      height: 40,
      borderColor: '#8ec18d',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: 10,
    },
    pickerBorder2:{
      width: "80%",
      height: 40,
      borderColor: '#8ec18d',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: 30,
      
    },
  //   pickerdropdown:{
      
  //     },
      Box:{
      marginTop: 30,
      width: "80%",
      height: 40,
      borderColor: "#8ec18d",
      borderWidth: 2,
      borderRadius: 10,
      fontSize: 20,
      textAlign: "center",
    },
    btnContainer: {
      width: "80%",
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
      
});
  
// const mapStateToProps = (state) => {

//     return {
//         user : state.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addUser: (user) => {dispatch({type: "TOGGLE_USERS", user: user})}
//     }
// }

// export default connect(mapDispatchToProps, mapStateToProps)(RegisterUserDetail);
export default RegisterUserDetail;