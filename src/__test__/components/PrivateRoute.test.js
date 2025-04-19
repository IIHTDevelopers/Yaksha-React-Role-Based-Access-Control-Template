import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import { AuthContext } from '../../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

const MockComponent = () => <div>Mock Component</div>;

describe('boundary', () => {
    test('PrivateRouteComponent boundary redirects to login if user is not authenticated', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <PrivateRoute path="/dashboard" component={MockComponent} />
                    <Route path="/login" render={() => <div>Login Page</div>} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    test('PrivateRouteComponent boundary renders component if user is authenticated and role is allowed', () => {
        const mockUser = { username: 'testuser', role: 'user' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <PrivateRoute path="/dashboard" component={MockComponent} roles={['user', 'admin']} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Mock Component')).toBeInTheDocument();
    });

    test('PrivateRouteComponent boundary redirects to access-denied if user role is not allowed', () => {
        const mockUser = { username: 'testuser', role: 'user' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <MemoryRouter initialEntries={['/admin-dashboard']}>
                    <PrivateRoute path="/admin-dashboard" component={MockComponent} roles={['admin']} />
                    <Route path="/access-denied" render={() => <div>Access Denied</div>} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Access Denied')).toBeInTheDocument();
    });
});
