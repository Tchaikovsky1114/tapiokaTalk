
import React from 'react'

import PageTitle from '../components/common/PageTitle'
import PageContainer from '../components/common/PageContainer'
import { TextInput } from 'react-native'
import Input from '../components/common/Input'

const SettingsScreen = () => {
  return (
    <PageContainer style={{alignItems:'center'}}>
      <PageTitle text="Settings" />
      <Input />
      <Input />
      <Input />
    </PageContainer>
  )
}

export default SettingsScreen

