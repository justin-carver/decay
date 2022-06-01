import React from 'react';
import { render, screen } from '@testing-library/react';
import Decay from './Decay';

test('renders learn react link', () => {
    render(<Decay />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
