import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {Formik} from 'formik';
import {object, string} from 'yup';
import Snackbar from 'react-native-snackbar';
import imagePath from '../constant/imagePath'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface loginValues {
    email : string,
    password: string
}

const LoginScreen = ({navigation}) => {
  const [rememberMe, setRememberMe] = useState(false)

  const initialValues : loginValues = {email: '', password: ''}

  // schema validation =>
  let LoginUserSchema = object({
    email: string().email().required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Small Password')
      .max(16, 'Large Password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]/,
        // /^[A-Za-z]+[@][A-Za-z]+[.][A-Za-z]+$/,
        'Password must contain Character, Number, Symbol',
      ),
  });

  const handleSubmit = async (email : string, password: string)  => {
    try {
      if(rememberMe){
        await AsyncStorage.setItem('email', email)
        console.log('storage added');
      }
    } catch (e) {
      console.log('Email is not added');  
    }
    
    Snackbar.show({
      text: 'Login Successful',
      duration: Snackbar.LENGTH_LONG,
      textColor: 'white',
      backgroundColor: 'green'
    })

    navigation.navigate('UserHome')
    
  }

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Image source={imagePath.login} style={styles.image} />
    </View>
    <Text style={styles.title}>Login</Text>
    <Formik
      initialValues={initialValues}
      validationSchema={LoginUserSchema}
      onSubmit={(value) => handleSubmit(value.email, value.password)}
    >
      {({ values, touched, errors, handleSubmit, handleChange, handleBlur, isValid }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              {
                borderBottomColor: isValid || values.email.length === 0 ? '#CCC' : 'red',
              },
            ]}>
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                borderBottomColor: isValid || values.password.length === 0 ? '#CCC' : 'red',
              },
            ]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.rememberMeContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              tintColors={{ true: 'green', false: 'gray' }}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.loginButton,
              { backgroundColor: isValid ? '#FF7518' : '#FFCB00' },
            ]}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>New To App?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.registerLink}> Register </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 400,
    width: 500,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    color: 'black',
  },
  loginButton: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    width: 150,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    fontSize: 16,
    color: 'black',
  },
  registerLink: {
    color: 'orange',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default LoginScreen
