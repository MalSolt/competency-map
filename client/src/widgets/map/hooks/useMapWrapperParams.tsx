import { useRef, useEffect, Dispatch } from 'react';
import { throttle } from 'shared/utils/throttle';
import { SetContainerAction } from '../model/MapState';

export const useMapWrapperParams = (
  setParams: Dispatch<SetContainerAction>
) => {
  const wrapperParamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calcContainer = () => {
      const wrapper = wrapperParamsRef.current;
      if (!wrapper) return;
      const { x, y, width, height } = wrapper.getBoundingClientRect();
      setParams({
        type: 'setContainer',
        container: {
          height,
          width,
          offset: { i: x, j: y },
        },
      });
    };

    const [calcContainerThrottled] = throttle(calcContainer, 500);
    calcContainer();
    window.addEventListener('resize', calcContainerThrottled);
    return () => window.addEventListener('resize', calcContainerThrottled);
  }, [wrapperParamsRef, setParams]);
  return {
    wrapperParamsRef,
  };
};
