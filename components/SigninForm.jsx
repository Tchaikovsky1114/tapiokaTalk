import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';

import { validateInput } from '../util/formActions';
import { reducer } from '../util/reducer/formReducer';
import { signin } from '../util/authActions';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, Alert, View } from 'react-native';





const isRememberAuth = false;

const initialState = {
  values: {
    email: isRememberAuth ? 'coco@gmail.com' : '',
    password: isRememberAuth ? 'coco1234' : ''
  },
  validities: {
    email: isRememberAuth,
    password: isRememberAuth,
  },
  formIsValid: isRememberAuth,
};

const SigninForm = () => {
  const appDispatch = useDispatch();

  const [formState, dispatch] = useReducer(reducer, initialState);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState('');
  const changeInputHandler = useCallback(
    (name, value) => {
      const result = validateInput(name, value);
      dispatch({ name, validationResult: result, value });
    },
    [dispatch]
  );
  
  const submitAuthHandler = useCallback(async () => {  

    try {
      setIsLoading(true);
      
      const signinAction = signin(
        formState.values.email,
        formState.values.password,
        )  
      await appDispatch(signinAction);
      
    } catch (error) {
      setError(error.message);
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
  return (
    <PageContainer style={{ backgroundColor: '#fff' }}>
      <Input
        keyboardType="email-address"
        name="email"
        onChange={changeInputHandler}
        label="이메일"
        icon="email"
        IconPack={Entypo}
        iconSize={18}
        value={formState.values.email}
        iconColor={colors.default}
        errorText={formState.validities["email"]}
      />
      <Input
        label="비밀번호"
        icon="lock"
        IconPack={AntDesign}
        iconSize={24}
        iconColor={colors.default}
        onChange={changeInputHandler}
        value={formState.values.password}
        name="password"
        secureTextEntry
        errorText={formState.validities["password"]}
      />
      
      {
        isLoading
        ? <View style={{marginTop:24}}><ActivityIndicator size="large" color={colors.secondary} /></View>
        : <SubmitButton
        buttonText="로그인"
        onPress={submitAuthHandler}
        style={{ marginTop: 24 }}
        disabled={!formState.formIsValid}
      />
      }
    </PageContainer>
  );
};

export default SigninForm;
