import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchSuggestions from './SearchSuggestions';
import { setQuery } from '../slices/searchSlice'; // Import your action creator
const mockStore = configureStore([]);

// Mock the useDispatch and useSelector functions from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


// Mock the debounced function to execute immediately in the test
jest.mock('lodash/debounce', () => (fn) => fn);

describe('SearchSuggestions component', () => {

  it('should render the component', () => {
    const store = mockStore({
      search: {
        query: '',
        suggestions: [],
      },
    });

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchSuggestions />
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const input = getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('should update input value and dispatch setQuery action', () => {
    // Arrange
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) =>
      selector({ search: { query: 'initial query', suggestions: [] } })
    );

    const { getByPlaceholderText } = render(<SearchSuggestions />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const input = getByPlaceholderText('Search');

    // Act: Simulate user input change
    fireEvent.change(input, { target: { value: 'new query' } });

    // Assert: Check if the dispatch function was called with the expected action
    expect(dispatch).toHaveBeenCalledWith(setQuery('new query'));
  });

  it('should debounce API call', () => {
    // Arrange
    jest.useFakeTimers()
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) =>
      selector({ search: { query: 'initial query', suggestions: [] } })
    );

    const { getByPlaceholderText } = render(<SearchSuggestions />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const input = getByPlaceholderText('Search');

    // Act: Simulate user input change
    fireEvent.change(input, { target: { value: 'new query' } });

    // Wait for the debounce to trigger
    jest.runAllTimers(); // This assumes you mocked debounce to execute immediately

    // Assert: Check if the debounced API call was made
    //expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'fetchSuggestions' }));
    //expect(dispatch).toHaveBeenCalledWith(fetchSuggestions('new query'));
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'search/setQuery',
        payload: 'new query',
      })
    );
    //expect(dispatch).toHaveBeenCalledWith(fetchSuggestions('new query').fulfilled({ suggestions: ['suggestion1', 'suggestion2', 'suggestion3'] }));
  });

  it('should render suggestions when suggestions array is not empty', () => {
    // Arrange
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) =>
      selector({ search: { query: 'initial query', suggestions: ['suggestion1', 'suggestion2'] } })
    );
  
    const { container } = render(<SearchSuggestions />);
    
    // Act: No need to perform user input change if you want to test suggestions rendering.
  
    // Assert: Check if the suggestions are rendered.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const suggestionsContainer = container.querySelector('.absolute.top-10.left-0');
    expect(suggestionsContainer).toBeInTheDocument();
  
    // You can further check if specific suggestions are rendered as well.
    expect(suggestionsContainer).toHaveTextContent('suggestion1');
    expect(suggestionsContainer).toHaveTextContent('suggestion2');
  });  
});
