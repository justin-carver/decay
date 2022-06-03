import React from 'react';
import { render, screen } from '@testing-library/react';
import DecayCanvas from './components/DecayCanvas';

test('renders learn react link', () => {
    // render(<DecayCanvas  />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
