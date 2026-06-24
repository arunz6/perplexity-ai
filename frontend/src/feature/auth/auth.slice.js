import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    Loading: false,
    Error: false,
  },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setisLoading: (state, action) => {
      state.Loading = action.payload;
    },
    setisError: (state, action) => {
      state.Error = action.payload;
    },
  },
});

export const { setuser, setisLoading, setisError } = authslice.actions;
export default authslice.reducer;
 