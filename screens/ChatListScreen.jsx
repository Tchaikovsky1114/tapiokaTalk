import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/common/CustomHeaderButton'
import colors from '../constants/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ChatListScreen = () => {
  const navigation = useNavigation()
  const { params } = useRoute();
  const userData = useSelector(state => state.auth.userData);
  const userChats = useSelector(state => {const chatsData = state.chat.chatsData; return Object.values(chatsData)});
  
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

  useEffect(() => {
    if(!params?.selectedUserId) return;
    const selectedUsers = [params.selectedUserId,userData.userId];
    const navigationProps = {
      newChatData: { users: selectedUsers }
    }
    navigation.navigate("Chat", { users: navigationProps })
  }, [params])

  return (
    <FlatList
    data={userChats}
    renderItem={({item}) => {
      // userChats를 돌면서 users배열에서 내 id와 다른 상대방 id extract
      const otherUserId = item.users.find(uid => uid !== userData.userId);

      return <Text>{otherUserId}</Text>
    }}
    />
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