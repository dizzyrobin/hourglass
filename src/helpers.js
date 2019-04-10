export const toDoubleDigitString = n => `0${n}`.slice(-2);

export const formatTime = (timeInMilliseconds) => {
  const timeInSeconds = Math.round(timeInMilliseconds / 1000);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${toDoubleDigitString(seconds)}`;
};

export const formatPercentage = (time, max) => `${(time / max * 100).toFixed(2)}%`;
