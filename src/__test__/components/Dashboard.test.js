import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../context/AuthContext';
import Dashboard from '../../components/Dashboard';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('DashboardComponent boundary renders Dashboard component with user context', () => {
        const mockUser = { username: 'testuser' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Dashboard />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Welcome, testuser')).toBeInTheDocument();
        expect(screen.getByText('This is your User Dashboard.')).toBeInTheDocument();
    });

    test('DashboardComponent boundary renders Dashboard component without user context', () => {
        const mockUser = null;

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Dashboard />
            </AuthContext.Provider>
        );

        expect(screen.getByText('No user information available')).toBeInTheDocument();
        expect(screen.queryByText('Welcome,')).not.toBeInTheDocument();
    });
});
