import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import basicUserImage from '../assets/images/basic-user-image.png'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker, uploadImageAsync } from '../util/imagePickerHelper';
import { updateProfileImage } from '../util/authActions';
import { useDispatch } from 'react-redux';

const ProfileImage = ({height,width,uri,userId}) => {
  const source = uri ? { uri } : basicUserImage;
  const [image, setImage] = useState(source);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const pickImageHandler = async () => {
    
    try {
      setIsLoading(true)
      const pickImageUrl = await launchImagePicker();
      
      if(!pickImageUrl) return;  

      // uploadImage
      const uploadUrl = await uploadImageAsync(pickImageUrl);
      
      if(!uploadUrl) {
        throw new Error('프로필 이미지 업로드 실패')
      }
      // setImage
      setImage({ uri: pickImageUrl })
      // console.log(uploadUrl)
      await dispatch(updateProfileImage(userId, { profileImage: uploadUrl }));
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImageHandler}
      style={{alignSelf:'center', marginTop:8,position:'relative',width:'100%'}}>

        {
        isLoading
        ? <View style={{height: height ? height : 48,width: width ? width : 48,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color={[colors.default,colors.secondary,colors.active]} /></View>
        : <>
            <View style={{position:'absolute',bottom:0,right:0,zIndex:99,backgroundColor:colors.active,padding:4,borderRadius:9999}}>
              <MaterialCommunityIcons name="image-edit-outline" size={28} color="#fff" />
            </View>
            <Image
              style={{borderColor:colors.frame,borderWidth:2,height: height || 48,width: width || 48}}
              borderRadius={9999}
              source={image} />
          </>
        }
      
        
    </TouchableOpacity>
  )
}

export default ProfileImage


