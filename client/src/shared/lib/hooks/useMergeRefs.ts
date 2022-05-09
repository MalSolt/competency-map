import { Ref, RefCallback, useCallback } from 'react';

export function useMergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  return useCallback((elem: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(elem);
      }
      if (ref && 'current' in ref) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        ref.current = elem;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
