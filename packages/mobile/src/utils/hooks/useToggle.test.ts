import { act, renderHook } from '@testing-library/react-native';
import { useToggle } from './useToggle';

test('flips from false to true', async () => {
  const { result } = await renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);
  await act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(true);
});
