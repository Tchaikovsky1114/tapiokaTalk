import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../firebase';
import { child, ref, set } from 'firebase/database'
import { authenticate,logout } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './userActions';

let timer;


export const signup =  (name, email, password, passwordConfirm) => {

  return async (dispatch) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager: { accessToken,expirationTime } } = result.user;
      const expiryDate = new Date(expirationTime);

      const userData = await createUser(name,email,uid);
      // console.log('==signup==',userData);
      const now = new Date();
      const remainTokenValidTime = expiryDate - now;
      
      timer = setTimeout(() => {
        dispatch(userLogout())
      }, remainTokenValidTime)

      dispatch(authenticate({ token: accessToken, userData }));
      saveDataToStorage(accessToken,uid,expiryDate);
  
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

export const signin =  ( email, password) => {

  return async (dispatch) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager: { accessToken,expirationTime } } = result.user;
      const expiryDate = new Date(expirationTime);

      const now = new Date();
      const remainTokenValidTime = expiryDate - now;

      const userData = await getUserData(uid);
      // console.log('==signup==',userData);
      
      dispatch(authenticate({ token: accessToken, userData }));
      saveDataToStorage(accessToken,uid,expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout())
      }, remainTokenValidTime)

    } catch (error) {
      const errorCode = error.code;
      let message = 'Error Occured'
      if(errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        message = '비밀번호가 틀리거나 이메일이 올바르지 않습니다.'
        throw new Error(message);
      }
      throw new Error(error.code);
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
  const dbRef = ref(database);
  const childRef = child(dbRef, `users/${userId}`)
  await set(childRef, userData);
  return userData;
}

export const userLogout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  }
}

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem("userData", JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() }))
}