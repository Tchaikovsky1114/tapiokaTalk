import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          presentation: 'card',
          headerShown:false
        }}
      >
      <Stack.Group>
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
      </Stack.Group>
      
      <Stack.Group screenOptions={{
        animation:'slide_from_bottom',
        presentation: 'containedModal',
        headerShown:true,
        headerTitleStyle:{
          fontFamily:'black',
          color:colors.default
          }
        }}
        >
      <Stack.Screen
          name="NewChat"
          component={NewChatScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default MainNavigator

