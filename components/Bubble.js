import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef } from 'react';
import colors from '../constants/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as ClipBoard from 'expo-clipboard';
import uuid from 'react-native-uuid'
import { Feather } from '@expo/vector-icons';



const MenuItem = ({text, onSelect,iconPack, icon,color}) => {
  const Icon = iconPack ?? Feather;

  return <MenuOption onSelect={onSelect} >
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuText}>{text}</Text>
        <Icon name={icon} color={color} size={18} />
      </View>
  </MenuOption>
  }

const Bubble = ({ text, type, date }) => {
  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapper };
  const menuRef = useRef(null);
  const id = useRef(uuid.v4());
  
  let Container = View

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
      Container = TouchableWithoutFeedback
      break;
    case 'theirMessage':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyle.backgroundColor = '#f3f70a';
      bubbleStyle.maxWidth = '40%';
      Container = TouchableWithoutFeedback
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

  return (
    <View style={wrapperStyle}>
      <Container onLongPress={() =>menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{width: '100%'}}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>

          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
                <MenuItem icon="copy" text='글 복사하기' onSelect={() => copyToClipboard(text)} />
                <MenuItem icon="star" text='Star' onSelect={() => {}} color="#bcbc11" />
            </MenuOptions>
          </Menu>

        </View>
      </Container>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'android' ? 0 : 12,
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
