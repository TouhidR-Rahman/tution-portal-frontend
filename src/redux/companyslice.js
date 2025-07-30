import { createSlice } from "@reduxjs/toolkit";
const tutionCenterSlice = createSlice({
  name: "tutionCenter",
  initialState: {
    singleTutionCenter: {}, // Initialize with an empty object
    tutionCenters: [],
    searchTutionCenterByText: "",
  },
  reducers: {
    setSingleTutionCenter: (state, action) => {
      state.singleTutionCenter = action.payload;
    },
    setTutionCenters: (state, action) => {
      state.tutionCenters = action.payload;
    },
    setSearchTutionCenterByText: (state, action) => {
      state.searchTutionCenterByText = action.payload;
    },
  },
});

export const {
  setSingleTutionCenter,
  setTutionCenters,
  setSearchTutionCenterByText,
} = tutionCenterSlice.actions;

export default tutionCenterSlice.reducer;

export { tutionCenterSlice };
