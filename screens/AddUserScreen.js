import React, {useState} from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View,Text} from "react-native";
import  {firebase} from '../database/firebaseDb'
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import  Icon  from "react-native-vector-icons/FontAwesome";

const db = firebase.firestore()

const AddUserScreen = ({navigation, route}) => {
    const dbRef = db.collection('react-native-code');
    const[name, setname] = useState("");
    const[email, setemail] = useState("");
    const[mobile, setmobile] = useState("");
    const[isLoading, setisLoading] = useState(false);
    
    const storeUser = () => {
        if (name == '') {
            alert('Fill at least your name');
        } else {
            setisLoading(true);
            dbRef.add({
                name: name,
                email: email,
                mobile: mobile
            }).then((res) => {
                setname(""),
                setemail(""),
                setmobile(""),
                setisLoading(false)

                navigation.navigate('UserScreen')
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
            </View>
        )
    }

    return(
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Image 
                    source={{uri: 'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png'}}
                    style={{width:200, height: 200}}
                    containerStyle={{ marginLeft: 'auto', marginRight: 'auto'}}
                />
                <Input 
                    leftIcon={
                        <Icon 
                            name='user-o'
                            size={20}
                            color='gray'
                        />
                    }
                    placeholder="  Name"
                    onChangeText = {setname}
                />
                <Input 
                    leftIcon={
                        <Icon 
                            name='envelope-o'
                            size={20}
                            color='gray'
                        />
                    }
                    placeholder="  Email"
                    onChangeText = {setemail}
                />
                <Input 
                    leftIcon={
                        <Icon 
                            name='mobile'
                            size={30}
                            color='gray'
                        />
                    }
                    placeholder="  Mobile"
                    onChangeText = {setmobile}
                />
                <Button 
                    icon={
                        <Icon 
                        name='check'
                        size={15}
                        color='white'
                        />
                    }
                    title="  Add user"
                    buttonStyle={{
                        backgroundColor: 'green'
                    }}
                    onPress={() => storeUser()}
                />
                <Button 
                    icon={
                        <Icon 
                        name='users'
                        size={15}
                        color='white'
                        />
                    }
                    title="  Go to User List"
                    onPress={() => {
                        navigation.navigate("UserScreen")
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                />

                
            </ScrollView>
        </ThemeProvider>
        
    );
}

const theme = {
    Button: {
        raised: true
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    //   backgroundColor: "blue",
    //   alignItems: "center",
    //   justifyContent: "center",
    },
    preloader:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    } 

  });;
  
export default AddUserScreen;
