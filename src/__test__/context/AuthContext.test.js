import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../context/AuthContext';
import { getToken } from '../../utils/auth';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../utils/auth', () => ({
    getToken: jest.fn(),
}));

const MockComponent = () => {
    return (
        <AuthContext.Consumer>
            {({ user }) => (
                <div>
                    <span>{user ? `Username: ${user.username}` : 'No user'}</span>
                    <span>{user ? `Role: ${user.role}` : 'No role'}</span>
                </div>
            )}
        </AuthContext.Consumer>
    );
};

describe('boundary', () => {
    test('AuthProviderComponent boundary renders AuthProvider without crashing', () => {
        render(
            <AuthProvider>
                <div>Test</div>
            </AuthProvider>
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('AuthProviderComponent boundary sets user when token is valid', async () => {
        const mockToken = 'mockHeader.mockPayload.mockSignature';
        const mockDecodedToken = { sub: 'testuser', role: 'admin' };

        getToken.mockReturnValue(mockToken);
        jest.spyOn(global, 'atob').mockImplementation(() => JSON.stringify(mockDecodedToken));

        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Username: testuser')).toBeInTheDocument();
            expect(screen.getByText('Role: admin')).toBeInTheDocument();
        });

        global.atob.mockRestore();
    });

    test('AuthProviderComponent boundary handles invalid token gracefully', async () => {
        const mockInvalidToken = 'invalidToken';

        getToken.mockReturnValue(mockInvalidToken);

        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No user')).toBeInTheDocument();
            expect(screen.getByText('No role')).toBeInTheDocument();
        });
    });

    test('AuthProviderComponent boundary handles no token gracefully', async () => {
        getToken.mockReturnValue(null);

        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No user')).toBeInTheDocument();
            expect(screen.getByText('No role')).toBeInTheDocument();
        });
    });
});
