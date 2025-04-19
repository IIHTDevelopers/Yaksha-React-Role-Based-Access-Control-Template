import React from 'react';
import { render, screen } from '@testing-library/react';
import AccessDenied from '../../components/AccessDenied';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('AccessDeniedComponent boundary renders AccessDenied component', () => {
        render(<AccessDenied />);

        expect(screen.getByRole('heading', { name: /access denied/i })).toBeInTheDocument();
        expect(screen.getByText('You do not have permission to view this page.')).toBeInTheDocument();
    });
});
