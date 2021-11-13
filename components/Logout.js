import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../database/Auth';

const Logout = () => {
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
    // <View style={styles.container}>
    //   <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Sign out</Text>
      </TouchableOpacity>
    // </View>
  )
}

export default Logout

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
  btnText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
  },
  btnContainer: {
    width: "35%",
    elevation: 8,
    backgroundColor: "#cecece",
    borderRadius: 10,
    paddingVertical: 5,
    // paddingHorizontal: 20,
  }
})