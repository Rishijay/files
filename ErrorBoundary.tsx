import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

// Mock the useSWR hook
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('MyComponent', () => {
  it('renders null if data is undefined', () => {
    // Mock useSWR to return undefined data
    useSWR.mockReturnValue({ data: undefined });

    const { container } = render(<MyComponent />);

    // Expect component to render null
    expect(container.firstChild).toBeNull();
  });

  it('renders null if data is not an array', () => {
    // Mock useSWR to return non-array data
    useSWR.mockReturnValue({ data: 'not an array' });

    const { container } = render(<MyComponent />);

    // Expect component to render null
    expect(container.firstChild).toBeNull();
  });
