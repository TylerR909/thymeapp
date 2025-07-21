import { useCallback, useState } from 'react';

export const useToggle = () => {
  const [t, _set] = useState(false);
  const set = useCallback(() => {
    _set(t => !t);
  }, [_set]);
  return [t, set] as const;
};
