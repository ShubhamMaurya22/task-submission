import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Routes = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async function (){
      try {
        let res = await AsyncStorage.getItem('email')
        setUser(res)  
        console.log(user)
      } catch (error) {
        console.log('user not fount');
        
      }
    }
    getUser()
  }, [])

  return  user ?  <AppStack/> : <AuthStack/>

  
}

export default Routes

const styles = StyleSheet.create({})