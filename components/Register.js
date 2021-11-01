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
            navigation.navigate('AddUserDetail');
          }
        })
        return unsubscribe
      }, [])
    //สมัคร
    const handleSignUp = () => {
        setisLoading(true);
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
            navigation.navigate('AddUserDetail');
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
        <View style={styles.container}>
            <View style={{alignItems: "center", marginTop: 50}}>
                <Image style={styles.diet} source={require("../assets/Diet.gif")}/>
            </View>

            <View style={{alignItems: "center" , marginTop: 30,}}>
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
                <TextInput
                    style={styles.Box}
                    placeholder="ยืนยันรหัสผ่าน"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmpass(text)}

                />
            </View>
    
            <View style={{alignItems: "center" , marginTop: 50,}}>
                <TouchableOpacity 
                    style={styles.btnContainer}
                    onPress={handleSignUp}>
                    <Text style={styles.btnText}>สร้างบัญชีใหม่</Text>
                </TouchableOpacity>
            </View>
    
            <View style={{flexDirection: 'row', justifyContent: "center" , marginTop: 50,}}>
                    <Text style={styles.btnNewText2}>มีบัญชีผู้ใช้อยู่แล้ว ?</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate("LogIn")
                        }}  >
                        <Text style={styles.btnNewText}> เข้าใช้งาน</Text>
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