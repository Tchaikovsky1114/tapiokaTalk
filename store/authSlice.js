import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token : null,
    userData : null,
    didTryAutoLogin : false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state) => {
      state.didTryAutoLogin = true;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      state.didTryAutoLogin = false;
    },
    updateUserData: (state,action) => {
      console.log('action',action);
      const { payload } = action;
      state.userData.name = payload.username
      state.userData.me = payload.me
      state.userData.email = payload.email
    }
  }
})

export const authenticate = authSlice.actions.authenticate;
export const updateUserData = authSlice.actions.updateUserData;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;