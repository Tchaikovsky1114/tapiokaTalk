import { child, endAt, get, orderByChild, query, ref, startAt } from "firebase/database";
import { auth, database } from "../firebase";


export const getUserData = async(userId) => {
  try { 
    
      const dbRef = ref(database);
      const userRef = child(dbRef,`users/${userId}`);
      const snapshot = await get(userRef);
      return snapshot.val();
    
  } catch (error) {
    console.error(error.message);
  }
}

export const searchUsers = async (queryText) => {
  console.log(queryText);
  const searchTerm = queryText;
  try {
    const dbRef = ref(database);
    const userRef = child(dbRef,'users');

    //endAt의 uf9ff 유니코드는 uf8ff까지 찾아주는 역할.
    const queryRef = query(userRef, orderByChild('name'), startAt(searchTerm), endAt(searchTerm + "\uf9ff"));
    console.log(queryRef);
    const snapshot = await get(queryRef);
    
    if(snapshot.exists()){
      return snapshot.val();
    }

    return {}
  } catch (error) {
    console.error(error);
    throw error
  }
  
}