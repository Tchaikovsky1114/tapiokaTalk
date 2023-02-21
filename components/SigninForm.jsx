
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';
import { validateEmail, validatePassword } from '../util/validationConstraints';
import { validateInput } from '../util/formActions';

const SigninForm = () => {
  const [signinInfo, setSigninInfo] = useState({
    email: '',
    password: '',
  });

  const changeInputHandler = (name, value) => {
    console.log(validateInput(name, value));
    setSigninInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
      <PageContainer style={{ backgroundColor: '#fff'}}>
        <Input keyboardType="email-address" name="email" onChange={changeInputHandler}  value={signinInfo.email} label="이메일" icon="email" IconPack={Entypo} iconSize={18} iconColor={colors.default} />
        <Input label="비밀번호" icon="lock" IconPack={AntDesign} iconSize={24} iconColor={colors.default} onChange={changeInputHandler} value={signinInfo.password} name="password" secureTextEntry />
        <SubmitButton buttonText="로그인" onPress={() => {}} style={{marginTop:24}} />
      </PageContainer>
  )
}

export default SigninForm
