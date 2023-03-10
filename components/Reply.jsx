import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import { Feather } from '@expo/vector-icons';
const Reply = ({text, user, onCancel}) => {
  const name = `${user.name}`
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>{name}님의 메시지</Text>
        <View style={{flexDirection:'row'}}>
        <Feather name="corner-down-right" size={14} color="#eee" />
        <Text numberOfLines={1} style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  )
}

export default Reply

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4edf4edd',
    padding:4,
    paddingVertical:16,
    borderLeftWidth:6,
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