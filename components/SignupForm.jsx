import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';
import { validateInput } from '../util/formActions';
import { reducer } from '../util/reducer/formReducer';
import { signup } from '../util/authActions';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const initialState = {
  values:{
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  validities:{
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  },
  formIsValid : false
}

const SignupForm = () => {
  const appDispatch = useDispatch();

  const [formState, dispatch] = useReducer(reducer,initialState)
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const changeInputHandler = useCallback((name, value) => {
    const result = validateInput(name,value);
    dispatch({name, validationResult: result, value});
  },[dispatch]);
  
  const submitAuthHandler = async () => {
    
    try {
      setIsLoading(true);
      const signupAction = signup(
        formState.values.username,
        formState.values.email,
        formState.values.password,
        formState.values.passwordConfirm,
        )  
      await appDispatch(signupAction);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false)
    }
  }
  
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
      
    }
  }, [error])

  return (
    <PageContainer style={{ backgroundColor: '#fff' }}>
      <Input
        label="이름"
        icon="user"
        IconPack={AntDesign}
        iconSize={28}
        iconColor={colors.default}
        name="username"
        onChange={changeInputHandler}
        errorText={formState.validities["username"] && formState.validities["username"].join('\n')}
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
      />
      <Input
        label="비밀번호"
        icon="lock"
        IconPack={AntDesign}
        iconSize={24}
        iconColor={colors.default}
        name="password"
        onChange={changeInputHandler}
        secureTextEntry
        errorText={formState.validities["password"] && formState.validities["password"].join('\n')}
      />
      <Input
        label="비밀번호 확인"
        icon="lock"
        IconPack={AntDesign}
        iconSize={24}
        iconColor={colors.default}
        name="passwordConfirm"
        onChange={changeInputHandler}
        secureTextEntry
        errorText={formState.validities["passwordConfirm"] && formState.validities["passwordConfirm"].join('\n')}
      />

      {
        isLoading
        ? <View style={{marginTop:24}}><ActivityIndicator size="large" color={colors.secondary} /></View>
        : <SubmitButton
        buttonText="가입하기"
        onPress={submitAuthHandler}
        style={{ marginTop: 24 }}
        disabled={!formState.formIsValid || isLoading}
      />
      }
    </PageContainer>
  );
};

export default SignupForm;


