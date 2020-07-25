import { useEffect, useState } from 'react';

const useResponsiveDimensions = (myRef) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Triggers dimension update when window changes
  useEffect(() => {
    const getRefHeightAndWidth = () => {
      setWidth(myRef.current.offsetWidth);
      setHeight(myRef.current.offsetHeight);
    };

    // Needs to be called to get the dimensions when the reference first mounts
    getRefHeightAndWidth();

    // Adds event listener to get new dimensions when window changes
    window.addEventListener('resize', getRefHeightAndWidth);

    return () => {
      window.removeEventListener('resize', getRefHeightAndWidth);
    };
  }, [myRef]);

  return { width, height };
};

export default useResponsiveDimensions;
