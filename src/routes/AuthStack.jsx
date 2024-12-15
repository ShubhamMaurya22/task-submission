import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import LoginScreen from '../screens/LoginScreen'
import Signup from '../screens/SignupScreen'
import UserHomeScreen from '../screens/HomeScreen'

const AuthStack = () => {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name='UserHome' component={UserHomeScreen} />
         </Stack.Navigator>
      
   </NavigationContainer>
  )
}

export default AuthStack

const styles = StyleSheet.create({})