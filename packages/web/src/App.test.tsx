import { render, screen } from '@testing-library/react';
import { expect, test } from 'bun:test';
import { App } from './App';

test('renders the product name', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'ThymeApp' })).toBeTruthy();
});
