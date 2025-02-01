import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { value: "" },
  reducers: {
    changeFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
