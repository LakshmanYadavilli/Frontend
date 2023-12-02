import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: UserActivation,
  initialState: {
    message: {
      text: "",
      type: "",
    },
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setMessage } = userSlice.actions;
