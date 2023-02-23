import * as ImagePicker from 'expo-image-picker';
import { ref } from 'firebase/database';
import { Platform } from 'react-native';
import { database } from '../firebase';


export const launchImagePicker = async () => { 
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1,1],
    quality: 1,
  });

  if(!result.canceled) {
    return result.assets[0].uri;
  }
}

export const uploadImageAsync = async (uri) => {
  
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new Error("네트워크 요청 실패"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuid.v4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}