import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ListItem, Button, Input, Image, Badge } from "react-native-elements";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { auth } from '../database/Auth';

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LogIn")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
       <Button 
                    icon={
                        <Icon 
                        name='users'
                        size={15}
                        color='white'
                        />
                    }
                    title="  Go to Add User Screen"
                    onPress={() => {
                        navigation.navigate("AddUserScreen")
                    }}
                    containerStyle={{
                        marginBottom: 10
                    }}
                />

      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})