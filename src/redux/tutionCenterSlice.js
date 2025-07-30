import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutionCenters: [],
  selectedTutionCenter: null,
};

const tutionCenterSlice = createSlice({
  name: "tutionCenter",
  initialState,
  reducers: {
    setTutionCenters(state, action) {
      state.tutionCenters = action.payload;
    },
    setSelectedTutionCenter(state, action) {
      state.selectedTutionCenter = action.payload;
    },
  },
});

export const { setTutionCenters, setSelectedTutionCenter } =
  tutionCenterSlice.actions;
export default tutionCenterSlice.reducer;
