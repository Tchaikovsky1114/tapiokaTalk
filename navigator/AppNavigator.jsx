import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';



const AppNavigator = () => {

  
  const isAuth = useSelector(state => !!state.auth.token);
  console.log(isAuth);
  
  return (
    <NavigationContainer>
      {isAuth ? <MainNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
