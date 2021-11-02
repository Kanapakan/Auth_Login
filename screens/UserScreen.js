import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View,Text } from "react-native";
import  db from '../database/firebaseDb'
import { ListItem, Button, Input, Badge } from "react-native-elements";
// import  Icon  from "react-native-vector-icons/FontAwesome";


const UserScreen = ({navigation, route}) => {
    const firestoreRef = db.collection('react-native-code');
    const[isLoading, setisLoading] = useState(true);
    const[userArr, setUserArr] = useState([]);

    useEffect(() => {
        const unsubscribe = firestoreRef.onSnapshot(getCollection);
            return () => {
                unsubscribe();
                
            }
      }, []);
    // componentDidMount = () =>{
    //     const unsubscribe = firestoreRef.onSnapshot(getCollection);
    // }

    // const componentWillUnmount = () => {
    //     unsubscribe();
    // }
    const getCollection = (querySnapShot) =>{
        const userArr2 = [];
        querySnapShot.forEach((res) => {
            const {name, email, mobile} = res.data();
            userArr2.push({
                key: res.id,
                res,
                name,
                email,
                mobile
            })
            setUserArr([...userArr2]),
            setisLoading(false);
        })
        console.log("User :" + userArr.length);
    }

    if(isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#547F53"/>
            </View>
        )
    }

    return(
        <ScrollView>
            {
                userArr.map((item, i) => {
                    return (
                        <ListItem key={i} 
                        bottomDivider
                        onPress={() => {
                            navigation.navigate("UserDetail", {userKey: item.key})
                        }}
                        >
                            <Badge value={i+1}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                })
            }
        </ScrollView>
     )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
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
  
export default UserScreen;