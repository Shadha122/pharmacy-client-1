import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { store } from '../../store';
import reducer from '../../Features/UserSlice';




// Create a mock store to test the component
const mockStore = configureStore();
const initialState = {
  user: {},
  message: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const storeWithInitialState = mockStore(initialState);

test('Matches the UI snapshot', () => {
  const { container } = render(
    <Provider store={storeWithInitialState}>
      <Router>
        <AdminLogin />
      </Router>
    </Provider>
  );

  // Debug and match the snapshot
  screen.debug(container);
  expect(container).toMatchSnapshot();
});

test('Validates username input', () => {
  render(
    <Provider store={storeWithInitialState}>
      <Router>
        <AdminLogin />
      </Router>
    </Provider>
  );

  const usernameInput = screen.getByPlaceholderText(/enter your username/i);
  const testUsername = 'admin';

  // Simulate input
  fireEvent.change(usernameInput, { target: { value: testUsername } });
  expect(usernameInput.value).toBe(testUsername);
});

test('Validates password input', () => {
  render(
    <Provider store={storeWithInitialState}>
      <Router>
        <AdminLogin />
      </Router>
    </Provider>
  );

  const passwordInput = screen.getByPlaceholderText(/enter your password/i);
  const testPassword = 'admin123';

  // Simulate input
  fireEvent.change(passwordInput, { target: { value: testPassword } });
  expect(passwordInput.value).toBe(testPassword);
});

test('Handles successful login and navigation', () => {
  render(
    <Provider store={storeWithInitialState}>
      <Router>
        <AdminLogin />
      </Router>
    </Provider>
  );

  // Fill out form with valid credentials
  fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
    target: { value: 'admin123' },
  });
  fireEvent.click(screen.getByText(/login/i));

  // Ensure successful navigation
  expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard');
});

test('Displays error message on invalid login', () => {
  render(
    <Provider store={storeWithInitialState}>
      <Router>
        <AdminLogin />
      </Router>
    </Provider>
  );

  // Simulate invalid login
  fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
    target: { value: 'wrongUser' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
    target: { value: 'wrongPass' },
  });
  fireEvent.click(screen.getByText(/login/i));

  // Ensure error message is displayed
  expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
});

test('Initial state of the slice is correct', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    user: {},
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
});
