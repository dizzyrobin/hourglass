import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTimeout } from '../hooks';

const HourGlass = ({
  maxTime,
  startTime,
  pauseTime,
  format,
  refreshRatio,
}) => {
  const [remainingTime, setRemainingTime] = useState(maxTime);

  const setNewRemainingTime = () => {
    const now = pauseTime || Date.now();
    let newRemainingTime = maxTime - now + startTime;
    if (newRemainingTime < 0) {
      newRemainingTime = 0;
    }

    if (format(remainingTime) !== format(newRemainingTime)) {
      setRemainingTime(newRemainingTime);
    }
  };

  useEffect(() => {
    setNewRemainingTime();
  }, [maxTime, startTime, pauseTime]);

  useTimeout(() => {
    setNewRemainingTime();
  }, pauseTime ? null : refreshRatio);

  const usedTime = maxTime - remainingTime;

  return (
    <div>
      <h1>
        {format(remainingTime)}
      </h1>
      <br />
      <div>
        {`Used time: ${format(usedTime)}`}
      </div>
    </div>
  );
};

HourGlass.propTypes = {
  maxTime: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  pauseTime: PropTypes.number,
  format: PropTypes.func.isRequired,
  refreshRatio: PropTypes.number,
};

HourGlass.defaultProps = {
  pauseTime: null,
  refreshRatio: 1000,
};

export default HourGlass;
