import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

//screen
import UserHomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import Signup from '../screens/SignupScreen'



const Stack = createStackNavigator()

const AppStack = () => {
  
  return (
   <NavigationContainer>
         <Stack.Navigator initialRouteName='UserHome' screenOptions={{headerShown: false}}>
          <Stack.Screen name='UserHome' component={UserHomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
         </Stack.Navigator>
      
   </NavigationContainer>
  )
}

export default AppStack

const styles = StyleSheet.create({})