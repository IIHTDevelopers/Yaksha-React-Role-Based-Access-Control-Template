import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../context/AuthContext';
import AdminDashboard from '../../components/AdminDashboard';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('AdminDashboardComponent boundary renders AdminDashboard component with user context', () => {
        const mockUser = { username: 'adminuser' };

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <AdminDashboard />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Welcome, Admin adminuser')).toBeInTheDocument();
        expect(screen.getByText('This is your Admin Dashboard.')).toBeInTheDocument();
    });

    test('AdminDashboardComponent boundary renders AdminDashboard component without user context', () => {
        const mockUser = null;

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
                <AdminDashboard />
            </AuthContext.Provider>
        );

        expect(screen.getByText('No user information available')).toBeInTheDocument();
        expect(screen.queryByText('Welcome, Admin')).not.toBeInTheDocument();
    });
});
