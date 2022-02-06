import React, { useEffect, useState } from 'react'
import { ActivityIndicator,KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image} from 'react-native'
import { auth } from '../database/Auth'

const Register = ({navigation, route}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.navigate('RegisterUserDetail');
          }
        })
        return unsubscribe
      }, [])

    //สมัคร
    const handleSignUp = () => {
        setisLoading(true);
        navigation.navigate('RegisterUserDetail', {email:  email, password:  password});
    }
    
    if(isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#547F53" />
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <View style={{alignItems: "center", marginTop: 30}}>
                <Image style={styles.diet} source={require("../assets/Diet.gif")}/>
            </View>

            <KeyboardAvoidingView style={{alignItems: "center" , marginTop: 30,}}>
                <TextInput
                    style={styles.Box}
                    placeholder="อีเมล"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.Box}
                    placeholder="รหัสผ่าน"
                    keyboardType="default"
                    secureTextEntry={true}
                    //value={}
                    onChangeText={text => setPassword(text)}
                />
                {password.length < 6 ? (
                    <Text style={{color: "red", marginTop: 3, }}>
                    ความยาวอย่างน้อย 6 ตัวอักษร
                    </Text>) : null}
                <TextInput
                    style={styles.Box}
                    placeholder="ยืนยันรหัสผ่าน"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmpass(text)}
                />
                {password !== confirmpass ? (
        <Text style={{color: "red", marginTop: 3,}}>
          กรุณาใส่รหัสยืนยันที่ถูกต้อง 
        </Text>) : null}
            </KeyboardAvoidingView>
    
            <View style={{alignItems: "center" , marginTop: 30,}}>
                <TouchableOpacity 
                    style={styles.btnContainer}
                    onPress={handleSignUp}>
                    <Text style={styles.btnText}>สร้างบัญชีใหม่</Text>
                </TouchableOpacity>
            </View>
    
            <View style={{flexDirection: 'row', justifyContent: "center" , marginTop: 30,}}>
                    <Text style={styles.btnNewText2}>มีบัญชีผู้ใช้อยู่แล้ว ?</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate("LogIn")
                        }}  >
                        <Text style={styles.btnNewText}> เข้าใช้งาน</Text>
                    </TouchableOpacity>
                
            </View>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    diet: {
        height: 250,
        width: "60%"
    },
    line:{
        height: 50,
        width: "70%"
    },
    Box:{
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
    },
    btnNewText2: {
        fontSize: 20,
        color: "#000",
        alignSelf: "center",
    }
 });
      
export default Register;    