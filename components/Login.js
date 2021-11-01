// import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image,  ActivityIndicator} from 'react-native'
import { auth } from '../database/Auth'

const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('BottomTabScreen');
      }
    })
    return unsubscribe
  }, [])



  // login
  const handleLogin = () => {
    setisLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  if(isLoading) {
    return (
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#547F53" />
        </View>
    )
}

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* พวกรูปข้างบน */}
      <Image style={styles.leafLeft} source={require("../assets/fade_leaf_left-removebg.png")}/>
      <View style={styles.boxText}>
          <Text style={styles.baseText} >
              <Text style={styles.headText}>Find Food Fit Me {"\n"}</Text>
              <Text style={styles.normaltext}>หาอาหารที่ใช่ จากอะไรที่ชอบ</Text>
          </Text>
      </View>
      <View style={{alignItems: "center" , marginTop: 20}}>
        <Image style={styles.line} source={require("../assets/line-removebg.png")}/>
      </View>

      {/* input */}
      <View style={{alignItems: "center" , marginTop: 40,}}>
        <TextInput
          style={styles.userNameBox}
          placeholder="อีเมล"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput 
          style={styles.passwordBox}
          placeholder="รหัสผ่าน"
          keyboardType="default"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      {/* Buttons */}
      <View style={{alignItems: "center" , marginTop: 50,}}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.btnContainer}>
          <Text style={styles.btnText}> เข้าสู่ระบบ </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: "center" , marginTop: 50,}}>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register")
        }}>
          <Text style={styles.btnNewText}>สร้างบัญชีใหม่</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: 'center',
    // alignItems: 'center',
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
  boxText:{
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText:{
    fontFamily: 'Roboto',
    textAlign: "center"
  },
  headText:{
      fontSize:35,
      fontWeight: "bold",
  },
  normaltext:{
    fontSize: 20,
    color: "#808080"
  },
  leafLeft: {
      top: 10,
      left: 5,
      height: "25%",
      width: "25%"
  },
  line:{
    height: 50,
    width: "70%"
  },
  userNameBox:{
    width: "80%",
    height: 40,
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
  passwordBox:{
    width: "80%",
    height: 40,
    marginTop: 10,
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
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
  btnNewText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
  }


});