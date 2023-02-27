import { Platform, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

const PageContainer = ({children,style}) => {
  return (
    // Platform.OS === 'android' ? +Constants.statusBarHeight : 0
    <View style={{backgroundColor:'#fff',...style,flex:1,paddingHorizontal:24}}>
      {children}
    </View>
  )
}

export default PageContainer

