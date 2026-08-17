/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react-native';
import { useToggle } from './useToggle';

test('flips from false to true', () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);
  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(true);
});
