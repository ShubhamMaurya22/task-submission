import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Routes from './routes/Routes'

const App = () => {
  return (
   <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
   </GestureHandlerRootView> 
 
  )
}

export default App

const styles = StyleSheet.create({})