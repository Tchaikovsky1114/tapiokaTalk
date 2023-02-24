
import React, { useCallback, useEffect, useReducer, useState } from 'react'

import PageTitle from '../components/common/PageTitle'
import PageContainer from '../components/common/PageContainer'

import Input from '../components/common/Input'
import { AntDesign, Entypo } from '@expo/vector-icons'
import colors from '../constants/colors'
import { reducer } from '../util/reducer/formReducer'
import { validateInput } from '../util/formActions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '../components/common/SubmitButton'
import { updateUser, userLogout } from '../util/authActions'
import ProfileImage from '../components/ProfileImage'


const SettingsScreen = () => {
  
  const appDispatch = useDispatch()
  const [profileInputValue, setProfileInputValue] = useState({username:'',email:'',me:''})
  const userData = useSelector(state => state.auth.userData);
  const [isLoading,setIsLoading] = useState(false);
  const [showSaveSuccessMessage,setShowSaveSuccessMessage] = useState('await');
  const [error,setError] = useState('');

  const initialState = {
    values : {
      username: userData.name || '',
      email: userData.email || '',
      me: userData.me || '',
    },
    // ** validities 프로퍼티의 값들이 undefined여야 하는 이유 **
    // reducer 함수에서 undefined가 아니면 formIsValid가 false이기 때문
    // settings의 input에 초기 값은 기존의 form을 받아오기 때문에 undefined로 설정
    // for(const key in updatedValidities) {
    //   if(updatedValidities[key] !== undefined) {
    //     updatedFormIsValid = false;
    //     break;
    //   }
    validities: {
      username: undefined,
      email: undefined,
      me:undefined,
    },
    formIsValid : false
  }
  const [formState,dispatch] = useReducer(reducer,initialState)



  const hasChanges = () => {
    const currentName = formState.values.username;
    const currentEmail = formState.values.email;
    const currentMe = formState.values.me;
    return currentName !== userData.name || currentEmail !== userData.email || currentMe !== userData.me
  }

  const changeInputHandler = useCallback((name, value) => {
    setProfileInputValue((prev) => ({
      ...prev,
      [name] : value,
    }))

    const result = validateInput(name,value);
    dispatch({name, validationResult: result, value});
  },[dispatch]);

  const submitEditHandler = useCallback(async () => {  
    try {
      setIsLoading(true);
      const updateData = {
        email: formState.values.email,
        me : formState.values.me,
        username : formState.values.username
      }
      await appDispatch(updateUser(userData.userId,updateData))
      setShowSaveSuccessMessage('success');
    } catch (error) {
      setError(error.message);
      
    } finally {
      setIsLoading(false);
    }
  },[appDispatch,formState])

  useEffect(() => {
    if(error) {
      Alert.alert(
        "An Error Occured",
        error,
        [
          {
            text: "확인"
          }
        ]);
        setError(null);
    }
  }, [error])

  useEffect(() => {
    setProfileInputValue({
      username: userData.name,
      email:userData.email,
      me: userData.me
    })
  },[userData])

  useEffect(() => {
    if(showSaveSuccessMessage === 'await') return;
    const timer = setTimeout(() => setShowSaveSuccessMessage('await'),2000);
    return () => clearTimeout(timer);
  }, [showSaveSuccessMessage])
  console.log(userData);
  return (
    <PageContainer style={{alignItems:'center',justifyContent:'center'}}>
      <PageTitle text="Settings" />
      <ScrollView contentContainerStyle={{backgroundColor:'#fff',minHeight:'100%',width:'100%'}} showsVerticalScrollIndicator={false}>
        <ProfileImage width={120} height={120} userId={userData.userId} uri={userData.profileImage} />
      <Input
        label="이름"
        icon="user"
        IconPack={AntDesign}
        iconSize={28}
        iconColor={colors.default}
        name="username"
        onChange={changeInputHandler}
        errorText={formState.validities["username"] && formState.validities["username"].join('\n')}
        value={profileInputValue.username}
      />
      <Input
        label="이메일"
        icon="email"
        IconPack={Entypo}
        iconSize={18}
        iconColor={colors.default}
        name="email"
        onChange={changeInputHandler}
        keyboardType="email-address"
        errorText={formState.validities["email"] && formState.validities["email"].join('\n')}
        value={profileInputValue.email}
      />
      
      <Input
        label="Me"
        icon="account-music"
        IconPack={MaterialCommunityIcons}
        iconSize={28}
        iconColor={colors.default}
        name="me"
        onChange={changeInputHandler}
        errorText={formState.validities["me"] && formState.validities["me"]}
        numberOfLines={4}
        height={120}
        multiline={true}
        value={profileInputValue.me}
      />
      { showSaveSuccessMessage === 'success' && <Text style={{color:colors.secondary,fontSize:16}}>변경되었습니다.</Text>}
      {
        isLoading
        ? <View style={{marginTop:24}}><ActivityIndicator size="large" color={colors.secondary} /></View>
        : hasChanges() && <SubmitButton
        buttonText="저장하기"
        onPress={submitEditHandler}
        style={{ marginTop: 24 }}
        disabled={!formState.formIsValid}
      />
      }
      <SubmitButton
        buttonText="로그아웃"
        onPress={() => appDispatch(userLogout())}
        style={{marginTop: 24,}}
      />
      </ScrollView>
    </PageContainer>
    
  )
}

export default SettingsScreen

