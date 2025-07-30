import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTutorOpportunities: [],
  singleTutorOpportunity: null, // This will hold the tutor opportunity details when a user clicks on it
  searchTutorOpportunityByText: "",
  allAppliedTutorOpportunities: [], // This will hold
  searchedQuery: "",
};

const jobSlice = createSlice({
  name: "tutorOpportunities",
  initialState,
  reducers: {
    setAllTutorOpportunities(state, action) {
      state.allTutorOpportunities = action.payload; // Update state with fetched tutor opportunities
    },
    setSingleTutorOpportunity(state, action) {
      state.singleTutorOpportunity = action.payload; // Update state with fetched tutor opportunity details
    },
    setSearchTutorOpportunityByText(state, action) {
      state.searchTutorOpportunityByText = action.payload;
    },
    setAllAppliedTutorOpportunities(state, action) {
      state.allAppliedTutorOpportunities = action.payload;
    },
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },
    setAllAdminJobs(state, action) {
      state.allTutorOpportunities = action.payload; // Assuming admin jobs are stored here
    },
    setSearchJobByText(state, action) {
      state.searchTutorOpportunityByText = action.payload; // Assuming this is the correct field
    },
  },
});

export const {
  setAllTutorOpportunities,
  setSingleTutorOpportunity,
  setSearchTutorOpportunityByText,
  setAllAppliedTutorOpportunities,
  setSearchedQuery,
  setAllAdminJobs,
  setSearchJobByText,
} = jobSlice.actions;
export default jobSlice.reducer;
