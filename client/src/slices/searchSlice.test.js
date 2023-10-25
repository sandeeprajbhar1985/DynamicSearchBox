import searchReducer, { setQuery, fetchSuggestions } from './searchSlice';
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // Include any middleware you might be using
const mockStore = configureStore(middlewares);

describe('searchSlice', () => {

  afterEach(() => {
    fetchMock.restore(); // Restore the fetch mock after each test
  });


  it('should handle setting the query', () => {
    const initialState = { query: '', suggestions: [] };
    const action = setQuery('new query');
    const state = searchReducer(initialState, action);
    expect(state.query).toEqual('new query');
  });

  it('should fetch suggestions successfully', async () => {
    const query = 'example-query';
    const suggestionsData = ['suggestion1', 'suggestion2'];

    // Create a mock store
    const store = mockStore({ search: { query: '', suggestions: [] } });

    // Mock the fetch call
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => suggestionsData,
    });

    // Dispatch the action
    await store.dispatch(fetchSuggestions(query));

    // Retrieve the dispatched actions
    const actions = store.getActions();

    // Assertions
    expect(actions[0].type).toEqual(fetchSuggestions.pending.type);
    expect(actions[1].type).toEqual(fetchSuggestions.fulfilled.type);
    expect(actions[1].payload).toEqual(suggestionsData);
  });


  it('should handle rejected fetchSuggestions', () => {
    const initialState = { query: '', suggestions: [] };
    const action = fetchSuggestions.rejected;
    const state = searchReducer(initialState, action);
    // You can add expectations based on your error handling logic here
    expect(state).toEqual(initialState); // As an example, reset state to initial state on rejection
  });
});
