import { child, push, ref } from "firebase/database";
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
  }
}