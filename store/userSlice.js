import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    storedUsers: {},
  },
  reducers: {
    setStoredUsers: (state, action) => {
      const newUsers = action.payload.newData;
      // newUsers
      // {
      //   userSnapshotData: {
      //     email: 'coco@gmail.com',
      //     me: '안녕하세요타피오카화이팅',
      //     name: '김명성',
      //     profileImage:
      //       'https://firebasestorage.googleapis.com/v0/b/tapiokatalk.appspot.com/o/profilePics%2Fdb96aef5-4613-46c6-b777-3adaeb3c7d9f?alt=media&token=ab0539c2-7832-4a9a-ae9d-00c42e8589b5',
      //     registrationDate: '2023-02-22T08:21:51.875Z',
      //     savingName: '김 명성',
      //     userId: 'BR5t5v8k6lRsS6ucrwsnTDP9q6S2',
      //     username: '김명성',
      //   },
      // }
      const existingUsers = state.storedUsers;
      const usersArray = Object.values(newUsers);
      // usersArray
      // [
      //   {
      //     email: 'coco@gmail.com',
      //     me: '안녕하세요타피오카화이팅',
      //     name: '김명성',
      //     profileImage:
      //       'https://firebasestorage.googleapis.com/v0/b/tapiokatalk.appspot.com/o/profilePics%2Fdb96aef5-4613-46c6-b777-3adaeb3c7d9f?alt=media&token=ab0539c2-7832-4a9a-ae9d-00c42e8589b5',
      //     registrationDate: '2023-02-22T08:21:51.875Z',
      //     savingName: '김 명성',
      //     userId: 'BR5t5v8k6lRsS6ucrwsnTDP9q6S2',
      //     username: '김명성',
      //   },
      // ];
      for (let i = 0; i < usersArray.length; i++) {
        const userData = usersArray[i];
        existingUsers[userData.userId] = userData;
      }
      
      state.storedUsers = existingUsers;
    },
  },
});

export const setStoredUsers = userSlice.actions.setStoredUsers;
export default userSlice.reducer;
