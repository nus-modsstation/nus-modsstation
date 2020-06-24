import React from 'react';
import { render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

test('render ErrorMessage component', () => {
  const { getByText } = render(<ErrorMessage errorMessage="This is a test" />);
  const linkElement = getByText(/This is a test/i);
  expect(linkElement).toBeInTheDocument();
});
