import { Platform, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

const PageContainer = ({children,style}) => {
  return (
    <View style={{...style,flex:1,paddingHorizontal:24,marginTop:Platform.OS === 'android' ? +Constants.statusBarHeight : 0}}>
      {children}
    </View>
  )
}

export default PageContainer

