import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '../constants/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as ClipBoard from 'expo-clipboard';
import uuid from 'react-native-uuid'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { starMessage } from '../util/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import { setStoredUsers } from '../store/userSlice';


function formatDate(date) {
  const convertDate = new Date(date);
  let hours = convertDate.getHours();
  let minutes = convertDate.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes  = minutes < 10 ? '0' + minutes : minutes;
  return `${ampm} ${hours} ${minutes}`;
}


const MenuItem = ({text, onSelect,iconPack, icon,color}) => {
  const Icon = iconPack ?? Feather;

  return <MenuOption onSelect={onSelect} >
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuText}>{text}</Text>
        <Icon name={icon} color={color} size={18} />
      </View>
  </MenuOption>
  }

const Bubble = ({ text, type, date, userId, messageId, chatId, setReply, reply, name }) => {
  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapper };
  const starredMessages = useSelector(state => state.message.starredMessages[chatId] || {});
  const menuRef = useRef(null);
  const id = useRef(uuid.v4());
  const dispatch = useDispatch();
  const storedUsers = useSelector(state => state.user.storedUsers)
  
  let Container = View
  let isUserMessage = false;
  switch (type) {
    case 'system':
      textStyle.color = colors.deepGrey;
      bubbleStyle.backgroundColor = '#fef5c3';
      bubbleStyle.alignItems = 'center';
      break;
    case 'error':
      textStyle.color = colors.emphasis;
      bubbleStyle.backgroundColor = '#fff';
      bubbleStyle.borderWidth = 1;
      bubbleStyle.borderColor = '#f41';
      break;
    case 'myMessage':
      wrapperStyle.justifyContent = 'flex-end';
      bubbleStyle.backgroundColor = '#E7FED6';
      
      bubbleStyle.maxWidth = '40%';
      Container = TouchableWithoutFeedback;
      isUserMessage = true;
      break;
    case 'theirMessage':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyle.backgroundColor = '#f3f70a';
      
      bubbleStyle.maxWidth = '40%';
      Container = TouchableWithoutFeedback;
      isUserMessage = true;
      break;
    case 'reply':
      bubbleStyle.backgroundColor = '#ffe'
      textStyle.color = '#a7a7a7'
      break; 
    default:
      break;
  }

  const copyToClipboard = async (text) => {
    try {
      await ClipBoard.setStringAsync(text);   
    } catch (error) {
      console.error(error);
    }
  }
  const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
  const replyingToUser = reply && storedUsers[reply.sentBy];
  return (
    <View style={wrapperStyle}>
      <Container onLongPress={() =>menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{width: '100%'}}>
        <View style={[bubbleStyle,{justifyContent:'flex-start',alignItems:'flex-start'}]}>
          {
            name && <Text style={{fontWeight:'bold',color:'#a7a7a7'}}>{name}님의 메시지</Text>
          }
          {
            replyingToUser && <Bubble type='reply' text={reply.text} name={`${replyingToUser.name}`} />
          }

          <Text style={[textStyle,{lineHeight:22}]}>{text}</Text>
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
                <MenuItem icon="copy" text='글 복사하기' onSelect={() => copyToClipboard(text)} />
                <MenuItem icon="corner-down-left" text='답장하기' onSelect={setReply} />
                <MenuItem iconPack={AntDesign} icon={isStarred ? 'star' : 'staro'} text={isStarred ? '보관함에서 삭제' : '보관함에 보관'} onSelect={() => starMessage(messageId,chatId,userId)} color="#bcbc11" />
            </MenuOptions>
          </Menu>            
          <View style={{flexDirection:'row'}}>
              {isStarred && <FontAwesome name='star' size={14} color={colors.default} style={{marginRight:4}} />}
            <Text style={{fontSize:10,color:'#a7a7a7',letterSpacing:0.3}}>{date && formatDate(date)}</Text>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'android' ? 6 : 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 10,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Medium',
    letterSpacing: 0.3,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuItemContainer: {
    flexDirection:'row',
    padding: 4,
    alignItems:'center'
  },
  menuText: {
    flex:1, 
    fontFamily:'Medium',
    letterSpacing: 0.3,
    fontSize:16
  },
});
