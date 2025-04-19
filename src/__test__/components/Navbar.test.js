import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { removeToken } from '../../utils/auth';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../utils/auth', () => ({
    removeToken: jest.fn(),
}));

describe('boundary', () => {
    test('NavbarComponent boundary renders Navbar with Home and Login links when user is not authenticated', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    test('NavbarComponent boundary renders Navbar with Home, Dashboard, and Logout links when user is authenticated', () => {
        const mockUser = { username: 'testuser', role: 'user' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('NavbarComponent boundary renders Navbar with Home, Dashboard, Admin Dashboard, and Logout links when admin user is authenticated', () => {
        const mockUser = { username: 'adminuser', role: 'admin' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('NavbarComponent boundary calls removeToken and redirects to login when logout button is clicked', () => {
        const mockSetUser = jest.fn();
        const mockHistory = { push: jest.fn() };
        const mockUser = { username: 'testuser', role: 'user' };

        render(
            <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText('Logout'));

        expect(removeToken).toHaveBeenCalled();
        expect(mockSetUser).toHaveBeenCalledWith(null);
    });
});
