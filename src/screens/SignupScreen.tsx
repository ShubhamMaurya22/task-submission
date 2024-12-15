import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {Formik} from 'formik';
import {object, string} from 'yup';
import imagePath from '../constant/imagePath'
import Snackbar from 'react-native-snackbar';

interface signupValues {
    email : string,
    password: string,
    name: string
}

const Signup = ({navigation}) => {
  const [passwordStrength, setPasswordStrength] = useState('')
    const initialValues : signupValues = {email: '', password: '', name: ''}
     let SignupUserSchema = object({
         
         email: string().email().required('Email is required'),
         password: string()
           .required('Password is required')
           .min(6, 'Small Password')
           .max(16, 'Large Password')
           .matches(
             /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d@#$!%*?&]/,
             // /^[A-Za-z]+[@][A-Za-z]+[.][A-Za-z]+$/,
             'Password contain Unique Symbol/Number',
           ),
           name: string().min(2, 'Small Name').required('Name is required'),
       });
    
       const handleSubmit = (email : string, password: string, name: string )  => {
        Snackbar.show({
          text: 'Sign Up Successful',
          duration: Snackbar.LENGTH_LONG,
          textColor: 'white',
          backgroundColor: 'green'
        })
        navigation.navigate('UserHome', {userName: name})
        
      }

      const evaluatePasswordStrength = (password : string) => {
         let score = 0

         if(password.length >= 6){
          if(password.length >= 10) score += 1
          if (/[a-z]/.test(password)) score += 1;
          if (/[A-Z]/.test(password)) score += 1;
          if (/\d/.test(password)) score += 1;
          if (/[@#$!%*?&]/.test(password)) score += 1;
         }
         
         
        switch (score) {
          case 0:
          case 1:
          case 2:
            setPasswordStrength('Weak')
            return 
          case 3:
          case 4:
            setPasswordStrength('Medium')
            return 
          case 5:
            setPasswordStrength('Strong')
            return 
        }
      }

    
      return (
        <SafeAreaView style={styles.container}>
        <View>
          <Image source={imagePath.signup} style={styles.image} />
        </View>
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupUserSchema}
          onSubmit={(value) =>
            handleSubmit(value.email, value.password, value.name)
          }
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            isValid,
          }) => {
            return (
              <>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderBottomColor:
                        isValid || values.name.length == 0 ? '#CCC' : 'red',
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Enter Name"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderBottomColor:
                        isValid || values.email.length == 0 ? '#CCC' : 'red',
                    },
                  ]}
                >
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
                      borderBottomColor:
                        isValid || values.password.length == 0 ? '#CCC' : 'red',
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="black"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      handleChange('password')(text);
                      evaluatePasswordStrength(text);
                    }}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.passwordStrength,
                    {
                      color:
                        passwordStrength === 'Weak'
                          ? 'red'
                          : passwordStrength === 'Medium'
                          ? 'black'
                          : 'green',
                    },
                  ]}
                >
                  {passwordStrength}
                </Text>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.button,
                    {
                      backgroundColor: isValid ? '#FF7518' : '#FFCB00',
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Already have an Account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.footerLink}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
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
      passwordStrength: {
        fontWeight: 'bold',
        paddingBottom: 8,
        marginBottom: 20,
        paddingLeft: '80%',
      },
      button: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        width: 150,
      },
      buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
      },
      footerText: {
        fontSize: 16,
        color: 'black',
      },
      footerLink: {
        color: 'orange',
        fontWeight: '700',
        fontSize: 16,
      },
    })
    

export default Signup
