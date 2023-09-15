import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { invoke } from "@tauri-apps/api/tauri"

const EditModePressDetector = ({ isEditMode }) => {
  const router = useRouter();
  const [keyPressed, setKeyPressed] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      invoke('get_edit_hotkey')
        .then(result => {
          if (event.key === result) {
            setKeyPressed(true);
            setStartTime(Date.now());
          }
        })
        .catch(error => {
          console.error('Error getting edit mode hotkey:', error);
        });
    };

    const handleKeyUp = (event) => {
      invoke('get_edit_hotkey')
        .then(result => {
          if (event.key === result) {
            setKeyPressed(false);
            setStartTime(null);
          }
        })
        .catch(error => {
          console.error('Error getting edit mode hotkey:', error);
        });
    };

    const interval = setInterval(() => {
      if (startTime !== null && keyPressed) {
        const currentTime = Date.now();
        const duration = currentTime - startTime;
        if (duration >= 500) {
          if (isEditMode === "true") {
            console.log('Exiting edit mode');
            router.push('/');
          } else {
            console.log('Entering edit mode');
            router.push('/editmode');
          }
        }
      }
    }, 100);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyPressed, isEditMode, router]);

  return null;
};

export default EditModePressDetector;

