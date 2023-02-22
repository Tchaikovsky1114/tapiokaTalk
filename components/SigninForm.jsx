import React, { useCallback, useReducer, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';

import { validateInput } from '../util/formActions';
import { reducer } from '../util/reducer/formReducer';
import { signin } from '../util/authActions';

const initialState = {
  values: {
    email: '',
    password: ''
  },
  validities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SigninForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const changeInputHandler = useCallback(
    (name, value) => {
      const result = validateInput(name, value);
      dispatch({ name, validationResult: result, value });
    },
    [dispatch]
  );
  const submitSigninHandler = () => {
    signin(formState.values.email,formState.values.password)
  }

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
        iconColor={colors.default}
        errorText={formState.validities["email"] && formState.validities["email"].join('\n')}
      />
      <Input
        label="비밀번호"
        icon="lock"
        IconPack={AntDesign}
        iconSize={24}
        iconColor={colors.default}
        onChange={changeInputHandler}
        name="password"
        secureTextEntry
        errorText={formState.validities["password"] && formState.validities["password"].join('\n')}
      />
      <SubmitButton
        buttonText="로그인"
        onPress={submitSigninHandler}
        style={{ marginTop: 24 }}
        disabled={!formState.formIsValid}
      />
    </PageContainer>
  );
};

export default SigninForm;
