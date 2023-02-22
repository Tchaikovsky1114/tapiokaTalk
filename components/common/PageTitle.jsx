import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const PageTitle = ({text}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={[{fontFamily:'bold', fontSize: 28, color: colors.default, letterSpacing: 0.3}]}>{text}</Text>
    </View>
  )
}

export default PageTitle