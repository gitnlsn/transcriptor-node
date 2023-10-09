export const convertTimeToSeconds = (timeString: string): number => {
  const [firstPart] = timeString.split(',');

  const [hours, minutes, seconds] = firstPart
    .split(':')
    .map((numberString) => Number(numberString));

  return hours * 3600 + minutes * 60 + seconds;
};
