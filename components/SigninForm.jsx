
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PageContainer from './common/PageContainer';
import colors from '../constants/colors';
import Input from './common/Input';
import SubmitButton from './common/SubmitButton';

const SigninForm = () => {
  return (
      <PageContainer style={{ backgroundColor: '#fff'}}>
        <Input label="이메일" icon="email" IconPack={Entypo} iconSize={18} iconColor={colors.default} />
        <Input label="비밀번호" icon="lock" IconPack={AntDesign} iconSize={24} iconColor={colors.default} />
        <SubmitButton buttonText="로그인" onPress={() => {}} style={{marginTop:24}} />
      </PageContainer>
  )
}

export default SigninForm
