import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import backgroundImage from '../assets/images/tapioca-pearls.jpg';
import { Octicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PageContainer from '../components/common/PageContainer';
import Bubble from '../components/Bubble';

const ChatScreen = ({route}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const userList = useSelector(state => state.user.storedUsers);
  const userData = useSelector(state => state.auth.userData);
  const chatData = route?.params.users.newChatData;
  const [inputMessage, setInputMessage] = useState('');
  const [chatUsers,setChatUsers] = useState([]);
  const [chatId, setChatId] = useState(route?.params?.chatId)
  
  const sendMessage = useCallback(() => {
    setInputMessage("");
  },[inputMessage])

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userId);
    const otherUserData = userList[otherUserId]
    
    return otherUserData && otherUserData.name;
  }
  
  
  useEffect(() => {
    setChatUsers(chatData.users);
    navigation.setOptions({
      headerShown:true,
      headerTitle: getChatTitleFromName(),
      headerShadowVisible: false,
      headerTitleAlign:'center'
    })
  },[chatUsers])

  

  return (
    <SafeAreaView style={{ flex: 1,paddingBottom:24,backgroundColor:'#fff' }}>
      <ImageBackground
        style={{ flex: 14 }}
        source={backgroundImage}
        resizeMode="stretch"
      >
        <PageContainer style={{backgroundColor:'transparent'}}>
          {!chatId && <Bubble text="Hello world!" type="system" />}
        </PageContainer>
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

const styles = StyleSheet.create({});
