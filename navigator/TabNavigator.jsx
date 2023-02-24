import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatListScreen from '../screens/ChatListScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { SimpleLineIcons } from '@expo/vector-icons';

{/* <SimpleLineIcons name="bubbles" size={24} color="black" /> */}
const Tab = createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{}}
    >
      <Tab.Screen name="ChatList" component={ChatListScreen} options={{
        tabBarLabel: 'Chats',
        tabBarIcon: ({focused}) => {
          return <SimpleLineIcons name="bubbles" size={24} color={focused ? '#2d63e2' : "black"} />
        }
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({focused}) => {
          return <SimpleLineIcons name="settings" size={24} color={focused ? '#2d63e2' : "black"} />
        },
        headerTitle:'',
        headerShadowVisible:false,
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigator