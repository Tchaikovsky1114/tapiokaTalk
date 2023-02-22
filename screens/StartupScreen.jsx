import { View, Text, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../constants/colors'
import commonStyles from '../components/common/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { authenticate, setDidTryAutoLogin } from '../store/authSlice'
import { getUserData } from '../util/userActions'

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const tryLogin = async () => {
      // AsyncStorage.clear();
      const storedAuthInfo = await AsyncStorage.getItem('userData');

      if(!storedAuthInfo) {
        dispatch(setDidTryAutoLogin())
        return null;
      }
      const parsedData = JSON.parse(storedAuthInfo);
      const { token, userId, expiryDate:expiryDateString } = parsedData;

      const expiryDate = new Date(expiryDateString);

      if(expiryDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin());
        return null;
      }

      const userData = await getUserData(userId);
      
      dispatch(authenticate({token, userData}))
      
    }
    tryLogin();
  },[dispatch])
  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size={Platform.OS === 'android' ? 72 : 'large'} color={colors.active} />
    </View>
  )
}

export default StartupScreen