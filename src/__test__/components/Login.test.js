import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { AuthContext } from '../../context/AuthContext';
import { saveToken } from '../../utils/auth';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../utils/auth', () => ({
    saveToken: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('boundary', () => {
    test('LoginComponent boundary renders Login component', () => {
        render(
            <AuthContext.Provider value={{ setUser: jest.fn() }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('LoginComponent boundary handles admin login', () => {
        const mockSetUser = jest.fn();
        const mockHistory = { push: jest.fn() };

        render(
            <AuthContext.Provider value={{ setUser: mockSetUser }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(saveToken).toHaveBeenCalledWith(JSON.stringify({ sub: 'admin', role: 'admin' }));
        expect(mockSetUser).toHaveBeenCalledWith({ username: 'admin', role: 'admin' });
    });

    test('LoginComponent boundary handles user login', () => {
        const mockSetUser = jest.fn();
        const mockHistory = { push: jest.fn() };

        render(
            <AuthContext.Provider value={{ setUser: mockSetUser }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'user' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(saveToken).toHaveBeenCalledWith(JSON.stringify({ sub: 'user', role: 'user' }));
        expect(mockSetUser).toHaveBeenCalledWith({ username: 'user', role: 'user' });
    });

    test('LoginComponent boundary handles invalid login', () => {
        window.alert = jest.fn();

        render(
            <AuthContext.Provider value={{ setUser: jest.fn() }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalid' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalid' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
});
