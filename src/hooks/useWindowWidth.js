import React, {useLayoutEffect, useState} from 'react';

// Source:
// https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react/19014495#19014495

const useWindowWidth = () => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowWidth