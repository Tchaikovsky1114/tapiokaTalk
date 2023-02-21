import React, { useCallback, useReducer, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';
import { validateInput } from '../util/formActions';
import { reducer } from '../util/reducer/formReducer';



const initialState = {
  validities:{
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  },
  formIsValid : false
}

const SignupForm = () => {
  
  const [formState, dispatch] = useReducer(reducer,initialState)

  const changeInputHandler = useCallback((name, value) => {
    const result = validateInput(name,value);
    dispatch({name, validationResult: result});
  },[dispatch]);
  
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
      />

      <SubmitButton
        buttonText="가입하기"
        onPress={() => {}}
        style={{ marginTop: 24 }}
        disabled={!formState.formIsValid}
      />
    </PageContainer>
  );
};

export default SignupForm;
