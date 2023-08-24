import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CtrlPressDetector = ({isEditMode}) => {
  const router = useRouter();
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Control') {
        setCtrlPressed(true);
        setStartTime(Date.now());
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        setCtrlPressed(false);
        setStartTime(null);
      }
    };

    const handleKeyPressDuration = () => {
      if (startTime !== null && ctrlPressed !== false) {
        const currentTime = Date.now();
        const duration = currentTime - startTime;
        if (duration >= 500) {  // 3000 milliseconds = 3 seconds
          if (isEditMode == "true") {
            console.log('Exiting edit mode');
            router.push('/');
          } else {
            console.log('Entering edit mode');
            router.push('/editmode');
          }
        }
      }
    };

    const interval = setInterval(handleKeyPressDuration, 100); // Check every 100ms

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [ctrlPressed, startTime]);

  return null;
};

export default CtrlPressDetector;
