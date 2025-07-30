import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutorOpportunities: [],
  selectedTutorOpportunity: null,
};

const tutorOpportunitySlice = createSlice({
  name: "tutorOpportunity",
  initialState,
  reducers: {
    setTutorOpportunities(state, action) {
      state.tutorOpportunities = action.payload;
    },
    setSelectedTutorOpportunity(state, action) {
      state.selectedTutorOpportunity = action.payload;
    },
  },
});

export const { setTutorOpportunities, setSelectedTutorOpportunity } =
  tutorOpportunitySlice.actions;
export default tutorOpportunitySlice.reducer;
