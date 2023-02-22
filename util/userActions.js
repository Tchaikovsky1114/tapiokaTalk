import { child, get, ref } from "firebase/database";
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