import { convertTimeToSeconds } from './convertTimeToSeconds';

describe('convertTimeToSeconds', () => {
  it.each([
    ['00:00:01,000', 1],
    ['00:00:01,000', 1],
    ['00:01:01,000', 61],
    ['01:00:01,000', 3601],
    ['01:01:01,000', 3661],
    ['01:01:01', 3661],
  ])('should convert string: %s -> %s', (timeString, expected) => {
    expect(convertTimeToSeconds(timeString)).toBe(expected);
  });
});
