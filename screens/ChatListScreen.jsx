import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

//noraml : 5c112b
//active

const ChatListScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Tapioka Talk</Text>

      <TouchableOpacity onPress={() => {navigation.navigate('Chat')}}>
        <Text style={{fontFamily:'black',color:'#5c112b',fontSize:24}}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})