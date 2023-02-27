import { View, Text, StyleSheet,TextInput, Platform, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/common/CustomHeaderButton'
import colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import PageContainer from '../components/common/PageContainer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import commonStyles from '../components/common/commonStyles'
import { FontAwesome5 } from '@expo/vector-icons';
import { searchUsers } from '../util/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { setStoredUsers } from '../store/userSlice'
const NewChatScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);
  const [users,setUsers] = useState();
  const [noResultFound,setNoResultFound] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const userData = useSelector(state => state.auth.userData);

  const pressUserHandler = (userId) => {
    navigation.navigate("ChatList",{
      selectedUserId: userId
    })
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily:'black',
        color:colors.default
      },
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {/* CustomHeaderButton의 props는 Item 컴포넌트로 전달한다. */}
            <Item title="Close" iconName='md-close' onPress={() => navigation.goBack()} color={colors.default} />
          </HeaderButtons>
          )
      }
    })
  },[])

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      
      if(!searchTerm) {
        setUsers();
        setNoResultFound(false);
        return;
      }
      setIsLoading(true);

      const usersResult = await searchUsers(searchTerm);
      delete usersResult[userData.userId];
      if(Object.keys(usersResult).length === 0) {
        setNoResultFound(true);
      }else{
        setNoResultFound(false);
        dispatch(setStoredUsers({ newData: usersResult }))
      }
      setUsers(usersResult);
      setIsLoading(false);
    },500);

    return () => clearTimeout(delaySearch);
    
  },[searchTerm])
  // console.log(users);
  return (
    <PageContainer>
      <View style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.frame,width:'100%',marginTop:16,minHeight:40,borderRadius:8,paddingHorizontal:4}}>
        <MaterialCommunityIcons name="account-search" size={24} color={colors.default} />
        <TextInput
          placeholder='친구 찾기'
          onChangeText={(text) => setSearchTerm(text)}
          style={{paddingLeft:4,fontSize:16,width:'100%',padding:0,margin:0,paddingTop: 0,paddingBottom: 0,textAlignVertical:'center',textAlign:'left',height:40}}
          numberOfLines={1}
          multiline={false}
          selectionColor={colors.default}
          placeholderTextColor={colors.active}
          />
      </View>
        {
          isLoading && (
            <View style={commonStyles.center}>
              <ActivityIndicator size="large" color={colors.default} />
            </View>
          )
        }
        { !isLoading && !noResultFound && users &&
          <FlatList
            data={Object.values(users)}
            contentContainerStyle={{width:'100%'}}
            renderItem={({item}) => {
              return (
              <TouchableOpacity
              onPress={() =>pressUserHandler(item.userId)}
              style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:4,marginTop:8,borderWidth:1,borderColor:colors.frame,paddingHorizontal:8,borderRadius:8,minHeight:96,maxHeight:120}}>
                <Image source={{uri: item.profileImage }} style={{width:56,height:56}} borderRadius={9999} />
                <View style={{width:32}}/>
                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',marginTop:16}}>
                  <View style={{flex:3}}>
                    <Text style={{fontFamily:'black',fontSize:16,lineHeight:24,color:colors.default}}>{item.name}</Text>
                  </View>
                  <View style={{flex:5}}>
                    <Text style={{fontFamily:'Medium',color:colors.grey,lineHeight:18}}>{item.me}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.userId}

          />
        }
        {
            !isLoading && !users && (
              <View style={commonStyles.center}>
                  <FontAwesome5 name="users-slash" size={60} color={colors.deepGrey} />
                  <Text style={{fontFamily:'bold',color:colors.deepGrey,letterSpacing:0.5}}>가끔은 혼자만의 생각이 필요할 때가 있어요.</Text>
              </View>
            )
        }
        {
            !isLoading && noResultFound && (
              <View style={commonStyles.center}>
                
                  <FontAwesome5 name="question" size={60} color={colors.deepGrey} />
                  <View style={{marginTop: Platform.OS === 'android' ? 0 : 8}}>
                    <Text style={{fontFamily:'bold',color:colors.deepGrey,letterSpacing:0.5}}>검색 결과가 존재하지 않습니다.</Text>
                  </View>
              </View>
            )
        }
        
    </PageContainer>
  )
}

export default NewChatScreen
