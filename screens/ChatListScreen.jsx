import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/common/CustomHeaderButton'
import colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'

const ChatListScreen = () => {
  const navigation = useNavigation()
  
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily:'black'
      },
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {/* CustomHeaderButton의 props는 Item 컴포넌트로 전달한다. */}
            <Item title="New Chat" iconName='chatbox-ellipses' onPress={() => navigation.navigate('NewChat')} color={colors.emphasis} />
          </HeaderButtons>
          )
      }
    })
  },[])
  return (
    <View style={styles.container}>
      <Text style={{fontFamily:'black',lineHeight:18}}>Tapioka Talk</Text>
      <TouchableOpacity style={{marginTop:Platform.OS === 'android' ? -16 : 0 }} onPress={() => navigation.navigate('Chat')}>
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