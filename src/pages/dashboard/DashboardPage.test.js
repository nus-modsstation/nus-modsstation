import React from 'react';
import { render } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';

test('render Dashboard page', () => {
  const { getByText } = render(<DashboardPage />);
  const linkElement = getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
