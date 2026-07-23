'use client';

import { useCallback } from 'react';

type VibrationPattern = number | number[];

export function useVibration<T extends (...args: never[]) => unknown>(
  callback: T,
  pattern: VibrationPattern = [10],
): (...args: Parameters<T>) => ReturnType<T> {
  return useCallback(
    (...args: Parameters<T>) => {
      navigator.vibrate?.(pattern);

      return callback(...args) as ReturnType<T>;
    },
    [callback, pattern],
  );
}
