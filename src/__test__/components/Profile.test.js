import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../context/AuthContext';
import Profile from '../../components/Profile';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('ProfileComponent boundary renders Profile component with user context', () => {
        const mockUser = { username: 'testuser', role: 'admin' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Profile />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Username: testuser')).toBeInTheDocument();
        expect(screen.getByText('Role: admin')).toBeInTheDocument();
    });

    test('ProfileComponent boundary renders Profile component without user context', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <Profile />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('No user information available')).toBeInTheDocument();
    });
});
