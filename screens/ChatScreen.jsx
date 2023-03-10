import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
  FlatList,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import backgroundImage from '../assets/images/tapioca-pearls.jpg';
import { Octicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PageContainer from '../components/common/PageContainer';
import Bubble from '../components/Bubble';
import { createChat, sendTextMessage } from '../util/chatActions';
import Reply from '../components/Reply';

const ChatScreen = ({route}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  
  const [inputMessage, setInputMessage] = useState('');
  const [chatUsers,setChatUsers] = useState([]);
  const [chatId, setChatId] = useState();
  const [errorBannerText, setErrorBannerText] = useState(''); 
  const [chatData, setChatData] = useState();
  const [reply,setReply] = useState();

  const storedUsers = useSelector(state => state.user.storedUsers);
  const userData = useSelector(state => state.auth.userData);
  const storedChats = useSelector(state => state.chat.chatsData);
  
  const chatMessages = useSelector(state => {
    if(!chatId) return;
    const chatMessagesData = state.message.messagesData[chatId];

    if (!chatMessagesData) return [];

    const messageList = [];
    for(const key in chatMessagesData) {
      const message = chatMessagesData[key];
      messageList.push({key,...message});
    }

    return messageList;
  })

  const sendMessage = async () => {

    try {
      if(!chatId) {
        // No chat Id. Create the chat
        // newChatData: 친구 목록 검색 후 친구를 클릭한 뒤 받아오는 친구와 나의 id가 담김.
        const chatRoomKey = await createChat(userData.userId,route?.params.newChatData)
        setChatId(chatRoomKey)
        await sendTextMessage(chatRoomKey,userData.userId,inputMessage);
      } else {
        await sendTextMessage(chatId,userData.userId,inputMessage);
      }
    } catch (error) {
      setErrorBannerText(`메세지 전송에 실패하였습니다.\n ERROR: ${error}`);
      setTimeout(() => { setErrorBannerText('') }, 3000)
    }  
      setInputMessage('');
  }

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userId);
    const otherUserData = storedUsers[otherUserId]
    return otherUserData && otherUserData.name;
  }




  useLayoutEffect(() => {
    setChatData((chatId && storedChats[chatId]) || route?.params.newChatData);
  }, [chatUsers,chatId])

  useEffect(() => {
    setChatId(route?.params?.chatId)
    
  },[route.params])

  useEffect(() => {
    if(!chatData) return;
      setChatUsers(chatData.users);
      navigation.setOptions({
        headerShown:true,
        headerTitle: getChatTitleFromName(),
        headerShadowVisible: false,
        headerTitleAlign:'center'
      })
  },[chatUsers,chatData,chatId])

  

  // useEffect(() => {
  //   if(!chatId) return ;
    
  //   // await createChat(userData.userId,route.params.users.newChatData)
  // },[route.params])
  


  return (
    <SafeAreaView style={{ flex: 1,paddingBottom:24,backgroundColor:'#fff' }}>
      <ImageBackground
        style={{ flex: 14 }}
        source={backgroundImage}
        resizeMode="stretch"
      >
        <PageContainer style={{backgroundColor:'transparent'}}>
          {!chatId && <Bubble text="Hello world!" type="system" />}
          {errorBannerText && <Bubble text={errorBannerText} type="error" />}
          {
            chatId && (
            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => {
                const message = item.text;
                const date = item.sentAt;
                const isMe = item.sentBy === userData.userId;

                const messageType = isMe ? 'myMessage' : 'theirMessage';
                return <Bubble text={message} date={date} type={messageType} messageId={item.key} userId={userData.userId} chatId={chatId} setReply={() => setReply(item)} />
              }}
            />
            )
          }
        </PageContainer>

        {
          reply && (
            <Reply onCancel={() => {}} text={reply.text} user={storedUsers[reply.sentBy] } />
          )
        }

      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={height * 0.12}
        style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor:'#fff',
          
        }}
      >
        {!inputMessage && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Octicons name="image" size={24} color={colors.default} />
          </TouchableOpacity>
        )}

        <TextInput
          value={inputMessage}
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: colors.frame,
            marginHorizontal: 8,
            paddingHorizontal: 8,
            minHeight: 32,
          }}
          cursorColor={colors.active}
          onChangeText={(text) => setInputMessage(text)}
          onSubmitEditing={sendMessage}
        />

        {!inputMessage && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SimpleLineIcons name="camera" size={24} color={colors.default} />
          </TouchableOpacity>
        )}
        {inputMessage && (
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              width: 32,
              height:32,
              padding:4,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.active,
              borderRadius:32,
            }}
          >
            <MaterialCommunityIcons name="send" size={18} color="#fff" style={{transform:[{rotate: '-30deg'}]}} />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
