import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import StartupScreen from '../screens/StartupScreen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { OverflowMenuProvider } from 'react-navigation-header-buttons'


const AppNavigator = () => {

  
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  
  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <OverflowMenuProvider>
          <>
      { isAuth && <MainNavigator /> }
      { !isAuth && didTryAutoLogin && <AuthScreen />}
      { !isAuth && !didTryAutoLogin && <StartupScreen />}
          </>
        </OverflowMenuProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
