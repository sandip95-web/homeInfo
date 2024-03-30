import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.loading = true;
    },
    singInSuccess: (state, action) => {
      (state.currentUser = action.payload), (state.loading = false);
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    UpdateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload), (state.loading = false);
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInFailure,
  singInStart,
  singInSuccess,
  updateUserFailure,
  updateUserSuccess,
  UpdateUserStart,
} = userSlice.actions;

export default userSlice.reducer;
