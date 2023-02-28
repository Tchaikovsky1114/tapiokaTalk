import { child, get, off, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import { database } from '../firebase';
import { setChatsData } from '../store/chatSlice';
import { setStoredUsers } from '../store/userSlice';

import StackNavigator from './StackNavigator';

const MainNavigator = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.user.storedUsers);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    console.log("subscribing to firebase listener");

    const dbRef = ref(database)
    const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
    const refs = [userChatsRef];
    // 값이 변경될 때마다 onValue가 실행됨.
    onValue(userChatsRef, (querySnapshot) => {
      const chatIdsData = querySnapshot.val() || {}; // [{firebasekey: chatId},{firebasekey: chatId}]
      const chatIds = Object.values(chatIdsData); // [chatId,chatId]

      const chatsData = {};
      let chatsFoundCount = 0;

      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i]; // chatId
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapshot) => {
          chatsFoundCount++;
          const data = chatSnapshot.val();
          
          if(data) {
            data.key = chatSnapshot.key;
            
            data.users.forEach((userId) => {
              if(storedUsers[userId]) return;
              
              const userRef = child(dbRef, `users/${userId}`);
              
               get(userRef)
               .then((userSnapshot) => {
                  const userSnapshotData = userSnapshot.val();
                  dispatch(setStoredUsers({ newData: { userSnapshotData } }));
                });
                
              refs.push(userRef);
            })
            chatsData[chatSnapshot.key] = data;
          }

          if(chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }
        })

        if(chatsFoundCount === 0) {
          setIsLoading(false);
        }
      }

      
    })
    return () => {
      console.log("Unsubscribing to firebase listener");
      refs.forEach(ref => off(ref));
    }
  }, [])

  if (isLoading) {
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color={colors.active} />
    </View>
  }

  return (
      <StackNavigator />
  )
}

export default MainNavigator

