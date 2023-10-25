// src/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Its your actions. Create an async thunk for fetching search suggestions from an API. . 
// We can also put the apis in separate service class for big project. For POC in kep in this file only.
export const fetchSuggestions = createAsyncThunk('search/fetchSuggestions', async (query) => {
  const response = await fetch(`http://localhost:3001/api/search/suggestion/${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    suggestions: [],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        // Handle the error here if needed
        console.log('APi call fail');
      });
  },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
