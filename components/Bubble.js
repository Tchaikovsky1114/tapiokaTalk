import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Bubble = ({text,type,date}) => {

  const bubbleStyle = {...styles.container}
  const textStyle = {...styles.text}
  const wrapperStyle = {...styles.wrapper}
  switch (type) {
    case "system":
      textStyle.color = colors.deepGrey;
      bubbleStyle.backgroundColor = '#fef5c3'
      bubbleStyle.alignItems = 'center';
      break;
    case "error":
      textStyle.color = colors.emphasis;
      bubbleStyle.backgroundColor = '#fff';
      bubbleStyle.borderWidth = 1;
      bubbleStyle.borderColor = '#f41'
      break;
    case "myMessage":
      wrapperStyle.justifyContent = 'flex-end';
      bubbleStyle.backgroundColor = '#E7FED6';
      bubbleStyle.maxWidth = '40%'
      break;
    case "theirMessage":
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyle.backgroundColor = '#f3f70a';
      bubbleStyle.maxWidth = '40%'
      break;

    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
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
  },
  wrapper: {
    flexDirection:'row',
    justifyContent:'center'
  }
})