import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Bubble = ({text,type}) => {

  const bubbleStyle = {...styles.container}
  const textStyle = {...styles.text}

  switch (type) {
    case "system":
      textStyle.color = colors.deepGrey;
      bubbleStyle.backgroundColor = '#fef5c3'
      bubbleStyle.alignItems = 'center';
      break;
  
    default:
      break;
  }

  return (
    <View style={{flexDirection:'row',justifyContent:'center'}}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  )
}

export default Bubble

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',paddingVertical:Platform.OS === 'android' ? 0 : 12,paddingHorizontal:8,borderRadius:6,marginBottom:10,borderColor:colors.grey,borderWidth:1,
  },
  text:{
    fontFamily:'Medium',letterSpacing:0.3
  }
})