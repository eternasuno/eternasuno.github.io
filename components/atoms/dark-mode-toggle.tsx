'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const DarkModeToggle = ({ className }: { className?: string }) => {
  const { theme, systemTheme, setTheme } = useTheme();

  const dark = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);

      return () => void window.removeEventListener('storage', onStoreChange);
    },
    () => (theme === 'system' && systemTheme !== 'light') || theme !== 'light',
    () => true,
  );

  return (
    <input
      checked={dark}
      className={className}
      onChange={({ currentTarget: { checked } }) => setTheme(checked ? 'dark' : 'light')}
      type="checkbox"
      value={theme}
    />
  );
};

export default DarkModeToggle;
