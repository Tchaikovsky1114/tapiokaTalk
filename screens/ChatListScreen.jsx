import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList, Image } from 'react-native'
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
  
  const storedUsers = useSelector(state => state.user.storedUsers);
  
  const userChats = useSelector(state => {
    const chatsData = state.chat.chatsData;
    const sortUpdatedAt = Object.values(chatsData).sort((a,b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    return sortUpdatedAt
  });
  
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

  // 로그인 시 기존의 채팅방을 가져오려면 chatSlice의 chatsData를 가져와야함.
  // useEffect(() => {
  //  getChatRooms(userData.userId)
  // },[])
  return (
    <FlatList
    contentContainerStyle={{minHeight:'100%',backgroundColor:'#fff'}}
    data={userChats}
    renderItem={({item}) => {
      
      const chatId = item.key;
      const otherUserId = item.users.find(uid => uid !== userData.userId);
      const otherUser = storedUsers[otherUserId];
      if(!otherUser) return;
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat',{ chatId })}
          style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:24,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:colors.grey}}
          >
          <Image source={{uri:otherUser.profileImage}} style={{width:40, height:40,marginRight:8}} borderRadius={40} />
          <View>
            <Text style={{fontSize:16,fontFamily:'bold'}}>{otherUser.name}님과의 대화</Text>
            <Text style={{fontSize:12,color:colors.grey}}>Will place Some message here..</Text>
          </View>
        </TouchableOpacity>
      )
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