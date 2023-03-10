import { child, get, push, ref, remove, set, update } from "firebase/database";
import { database } from "../firebase";

export const createChat = async (loggedInUserId, chatData) => {

  const newChatData = {
    ...chatData,
    createBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const dbRef = ref(database);
  // 새로운 채팅방 개설
  const newChat = push(child(dbRef, 'chats'), newChatData);

  const chatUsers = newChatData.users;

  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    // 내가 들어가 있는 채팅방 // 나와 대화하는 상대방의 채팅방 생성
    push(child(dbRef, `userChats/${userId}`), newChat.key);
    // await push(child(dbRef, `chats/${userId}`), newChat.key);
  }
  
  return newChat.key;
}

export const sendTextMessage = async (chatId, senderId, messageText) => {

  try {
  const dbRef = ref(database);
  const messagesRef = child(dbRef, `messages/${chatId}`);
  const chatRef = child(dbRef, `chats/${chatId}`);

  const messageData = { 
    sentBy : senderId,
    sentAt : new Date().toISOString(),
    text: messageText,
  }

  await push(messagesRef, messageData);

  await update(chatRef, {
    updatedBy: senderId,
    updatedAt: new Date().toISOString(),
    latestMessageText: messageText,
  })
  } catch (error) {
     console.error(error);
  }
}

export const starMessage = async (messageId, chatId, userId) => {
  try {
    const dbRef = ref(database);
    const starredMessageRef = child(dbRef, `starredMessages/${userId}/${chatId}/${messageId}`);
    
    const snapshot = await get(starredMessageRef);

    if(snapshot.exists()) {
      await remove(starredMessageRef);
    } else {
      
      const starredMessageData = {
        messageId,
        chatId,
        starredAt: new Date().toISOString()
      }

      await set(starredMessageRef, starredMessageData);
    }

  } catch (error) {
    console.error(error);
  }
}
