import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
  test('AppComponent boundary AuthProvider tag is present', () => {
    const { getByText } = render(
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    );
    // Check if a child component that uses the AuthProvider context is present
    const navbarText = getByText(/Login/i); // Assuming "Login" text is present in the Login component
    expect(navbarText).toBeInTheDocument();
  });

  test('AppComponent boundary Navbar component is present', () => {
    const { getByRole } = render(
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    );
    const navbarElement = getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  test('AppComponent boundary Routes are defined correctly', () => {
    const { getByText } = render(
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    );
    expect(getByText(/Login/i)).toBeInTheDocument();
  });
});
