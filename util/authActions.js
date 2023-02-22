import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase';
import { child, getDatabase, ref, set } from 'firebase/database'
import { authenticate } from '../store/authSlice';

export const signup =  (name, email, password, passwordConfirm) => {

  return async (dispatch) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager: { accessToken } } = result.user;
      
      const userData = await createUser(name,email,uid);
      console.log('==signup==',userData);
      dispatch(authenticate({ token: accessToken, userData }));
  
    } catch (error) {
      const errorCode = error.code;
  
      let message = "Something went wrong.";
  
      if(errorCode === 'auth/email-already-in-use') {
        message = "현재 사용중인 이메일입니다."
      }
      throw new Error(message);
    }
  }
  
}


const createUser = async (name,email, userId) => {
  const savingName = `${name.substring(0,1)} ${name.substring(1)}`.toLowerCase();
  const userData = {
    name,
    savingName,
    email,
    userId,
    registrationDate: new Date().toISOString()
  }
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`)
  await set(childRef, userData);
  return userData;
}

export const signin = (email, password) => {
  console.log(email, password);
}