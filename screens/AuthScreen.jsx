import { TouchableOpacity, SafeAreaView, ScrollView, Text, View, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import SigninForm from '../components/SigninForm'
import colors from '../constants/colors'
import logo from '../assets/tapioca-talk.png'

const AuthScreen = () => {
  const [isSignup,setIsSignup] = useState(false);

  const switchMethodHandler = () => {
    setIsSignup(prev => !prev)
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',position:'relative'}}>
      
      <View style={{marginTop:Platform.OS === 'android' && 36,justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:'50%'}} borderRadius={16} source={logo} resizeMode="stretch" />
      </View>
      <ScrollView contentContainerStyle={{minHeight:'100%'}}> 
      <View style={{marginHorizontal:24,marginTop:Platform.OS === 'ios' ? 32 : 0,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontFamily:'bold',fontSize:24}}>{isSignup ? '로그인' : '회원가입'}</Text>
      <TouchableOpacity
        onPress={switchMethodHandler}
        style={{justifyContent:'center',alignSelf:'flex-end'}}
        >
          <Text style={{color:colors.secondary,fontSize:12}}>{isSignup ? 'Switch to 회원가입' : 'Switch to 로그인'}</Text>
        </TouchableOpacity>
      </View>
      
      {!isSignup ? <SignupForm /> : <SigninForm />}
      
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default AuthScreen