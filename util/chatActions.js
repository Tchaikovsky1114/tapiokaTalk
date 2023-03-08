import { child, push, ref, update } from "firebase/database";
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
  const newChat = await push(child(dbRef, 'chats'), newChatData);

  const chatUsers = newChatData.users;

  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    // 내가 들어가 있는 채팅방
    await push(child(dbRef, `userChats/${userId}`), newChat.key);
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
     
  }
}