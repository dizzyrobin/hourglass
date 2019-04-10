import React, { useState } from 'react';

import HourGlass from './components/HourGlass';

import { formatTime } from './helpers';

const maxTime = 2 * 60 * 1000; // 2 minutes

const App = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const [pauseTime, setPauseTime] = useState(null);

  const handlePause = () => {
    if (pauseTime === null) {
      setPauseTime(Date.now());
    } else {
      const diff = pauseTime - startTime;
      const newStartTime = Date.now() - diff;
      setPauseTime(null);
      setStartTime(newStartTime);
    }
  };

  const handleFlip = () => {
    const now = pauseTime || Date.now();
    const diff = now - startTime;
    const remaining = diff > maxTime ? 0 : maxTime - diff;
    setStartTime(now - remaining);
  };

  return (
    <div>
      <HourGlass
        maxTime={maxTime}
        startTime={startTime}
        pauseTime={pauseTime}
        format={formatTime}
        refreshRatio={134}
      />
      <button
        type="button"
        onClick={handlePause}
      >
        {`${pauseTime === null ? 'Pause' : 'Continue'} time`}
      </button>
      <button
        type="button"
        onClick={handleFlip}
      >
        Flip hourglass
      </button>
    </div>
  );
};

export default App;
