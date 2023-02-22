import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const SubmitButton = ({style, onPress,buttonText,disabled}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{...style, backgroundColor:disabled ? '#aaa' : colors.default,justifyContent:'center',alignItems:'center',height:56,borderRadius:32}}
    disabled={disabled}
    >
      <Text style={{color:disabled ? colors.grey : '#fff',fontFamily:'bold',fontSize:22,lineHeight:28}}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default SubmitButton

