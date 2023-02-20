import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          presentation: 'card',
          headerBackTitle: 'Back',
          headerShadowVisible: false,
          headerTitle:''  
        }}
      >

        <Stack.Screen
          name="Home"
          component={TabNavigator}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ChatSettings"
          component={ChatSettingsScreen}
          options={{
            headerTitle: 'Settings',
          }}
        />

      </Stack.Navigator>
  )
}

export default MainNavigator

