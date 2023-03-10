import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const Reply = ({text, user, onCancel}) => {
  const name = `${user.name}`
  return (
    <View style={[styles.container,{flexDirection:'row'}]}>
      <View style={[styles.textContainer,{flex:9}]}>
        <Text numberOfLines={1} style={styles.name}>{name}님의 메시지</Text>
        <View style={{flexDirection:'row'}}>
        <Feather name="corner-down-right" size={14} color="#eee" />
        <Text numberOfLines={1} style={styles.text}>{text}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onCancel} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <FontAwesome name="close" size={18} color={colors.emphasis} />
      </TouchableOpacity>
    </View>
  )
}

export default Reply

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4edf4edd',
    paddingVertical:16,
    paddingHorizontal:12,
    borderLeftWidth:4 ,
    borderLeftColor:colors.default,
  },
  textContainer: {
    
  },
  name: {
    color: '#fff',
    fontWeight:'bold',
    marginBottom:4,
  },
  text: {
    color:'#eee'
  }
})