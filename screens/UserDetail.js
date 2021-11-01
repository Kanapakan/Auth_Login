import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View,Text, Alert } from "react-native";
import  db from '../database/firebaseDb'
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import  Icon  from "react-native-vector-icons/FontAwesome";

const UserDetail = ({navigation, route}, props) => {
    const[key, setKey] = useState("");
    const[name, setname] = useState("");
    const[email, setemail] = useState("");
    const[mobile, setmobile] = useState("");
    const[isLoading, setisLoading] = useState(true);
    const userKey = route.params.userKey;

    useEffect(() => {
        const dbRef = db.collection('react-native-code').doc(userKey);
        dbRef.get().then((res) => {
            //check ว่ามีข้อมูลอยู่ใน Doc ไหม
            if (res.exists){
                const user = res.data();
                setKey(res.id)
                setname(user.name),
                setemail(user.email),
                setmobile(user.mobile),
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
            const updateDBRef = db.collection('react-native-code').doc(key);
            updateDBRef.set({
                name: name,
                email: email,
                mobile: mobile,

            }).then(() => {
                setKey(''),
                setname(''),
                setemail(''),
                setmobile(''),
                setisLoading(false)
                console.log("แก้ไขสำเร็จ");
                navigation.navigate('UserScreen');
            }).catch((err) => {
                console.log("Error:", err),
                setisLoading(false)
            })
      }

      const deleteUser = () => {
        const dbRef = db.collection('react-native-code').doc(userKey);
        dbRef.delete().then((res) => {
            console.log("Item removed from database");
            navigation.navigate('UserScreen');
        })
      }

      const openTwoButtonAlert = () => {
          console.log('กดลบ')
          Alert.alert(
              'Delete User',
              'Are you sure?',
              [
                  {text: 'Yes', onPress: () => deleteUser()},
                  {text: 'No', onPress: () => console.log('No item was remove')}
              ],
              {
                  cancelable: true
              }

          )
      }

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="gray" />
            </View>
        )
    }

    return(
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Input 
                    placeholder={'Name'}
                    value={name}
                    onChangeText = {setname}
                />
                <Input 
                    placeholder={'Email'}
                    value={email}
                    onChangeText = {setemail}
                />
                <Input 
                    placeholder={'Mobile'}
                    value={mobile}
                    onChangeText = {setmobile}
                />
                <Button 
                    icon={
                        <Icon 
                            name="wrench"
                            size={15}
                            color='white'
                        />
                    }
                    title='  Update'
                    onPress={() => updateUser()}
                />

                <Button 
                    icon={
                        <Icon 
                            name="trash"
                            size={15}
                            color='white'
                        />
                    }
                    title='  Delete'
                    containerStyle={{
                        marginTop: 10
                    }}
                    buttonStyle={{
                        backgroundColor: 'red'
                    }}
                    onPress={() => openTwoButtonAlert()}
                />
            </ScrollView>
        </ThemeProvider>
    )
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

export default UserDetail;