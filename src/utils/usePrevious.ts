import { useEffect, useRef } from 'react';
type usePreviousParam = any;

// store the previous value of a state
export const usePrevious = (
  value: usePreviousParam,
  initialValue: usePreviousParam
): usePreviousParam => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
