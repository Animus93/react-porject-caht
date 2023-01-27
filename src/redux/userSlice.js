import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: {
      reducer: (state, actions) => {
        return state = actions.payload;
      },
    },
    logout: {
      reducer: () => initialState
    },
  },
});

export const { login, logout, } = userSlice.actions;
export default userSlice.reducer;