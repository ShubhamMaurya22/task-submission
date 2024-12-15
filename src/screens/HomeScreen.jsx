import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserHomeScreen = ({navigation, route} ) => {
  const {userName} = route?.params || 'User'
  
  const handleLogOut = async () => {
      try {
        await AsyncStorage.removeItem('email')
        console.log('delete');
      } catch (error) {
        console.log('no user found');  
      }
      navigation.navigate('Login')
      Snackbar.show({
        text:'Logout Succesfully',
        duration: Snackbar.LENGTH_LONG,
        textColor: 'white',
        backgroundColor: 'red'
      })
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome {userName}</Text>
        <TouchableOpacity onPress={handleLogOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 20,
    color: 'black'
  }
})

export default UserHomeScreen
