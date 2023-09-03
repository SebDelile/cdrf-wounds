import { useEffect, useRef, useState } from 'react';

// resize observer with a throttle option to reduce the number of call
const useResize = (containerRef: React.RefObject<Element>, delay = 100) => {
  const resizeTimeoutRef = useRef<number | null>(null);
  const previousCallRef = useRef<number | null>(null);
  const [size, setSize] = useState<number[]>([0, 0]);

  const resize = (entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      setSize([width, height - 4]);
      previousCallRef.current = Date.now();
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]): void => {
        const deltaPreviousCall = Date.now() - (previousCallRef.current || 0);

        if (deltaPreviousCall > delay) {
          resize(entries);
        } else {
          clearTimeout(resizeTimeoutRef.current!);
          resizeTimeoutRef.current = window.setTimeout(() => {
            resize(entries);
          }, Math.max(0, delay - deltaPreviousCall));
        }
      }
    );

    containerRef.current && resizeObserver.observe(containerRef.current);

    return () => {
      resizeTimeoutRef.current && clearTimeout(resizeTimeoutRef.current);
      resizeObserver.disconnect();
    };
  }, [containerRef, delay]);

  return size;
};

export default useResize;
