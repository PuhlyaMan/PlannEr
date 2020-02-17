import { useRef } from 'react';

const useCountRender = name => {
  const componentRerenderedTimes = useRef(0);
  console.log(name, ++componentRerenderedTimes.current);
  return componentRerenderedTimes.current;
};

export default useCountRender;
