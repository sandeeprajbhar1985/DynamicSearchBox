import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/searchSlice";
import { store } from "./store"; // Import your store configuration

describe("Redux Store Configuration", () => {
  it("should create a Redux store", () => {
    const testStore = configureStore({
      reducer: {
        search: searchReducer,
      },
    });

    expect(testStore).toBeDefined();
  });

  it("should have the correct initial state", () => {
    const initialState = store.getState();

    // Add your assertions for the initial state here
    expect(initialState.search).toEqual({ query: '', suggestions: [] });
  });

  
});
