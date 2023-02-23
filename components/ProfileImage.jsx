import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import basicUserImage from '../assets/images/basic-user-image.png'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker, uploadImageAsync } from '../util/imagePickerHelper';

const ProfileImage = ({height,width,uri}) => {
  const source = uri ? { uri } : basicUserImage;
  const [image, setImage] = useState(source);

  const pickImageHandler = async () => {

    try {
      const pickImageUrl = await launchImagePicker();
      
      if(!pickImageUrl) return;  

      // uploadImage
      const uploadUrl = uploadImageAsync(pickImageUrl);
      
      if(!uploadUrl) {
        throw new Error('프로필 이미지 업로드 실패')
      }
      // setImage
      setImage({ uri: pickImageUrl })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImageHandler}
      style={{alignSelf:'center', marginTop:8,position:'relative',width:'100%'}}>
      <View style={{position:'absolute',bottom:0,right:0,zIndex:99,backgroundColor:colors.active,padding:4,borderRadius:9999}}>
        <MaterialCommunityIcons name="image-edit-outline" size={28} color="#fff" />
      </View>
      <Image
        style={{borderColor:colors.frame,borderWidth:2,height: height || 96,width: width || 96}}
        borderRadius={9999}
        source={image} />
        
    </TouchableOpacity>
  )
}

export default ProfileImage


