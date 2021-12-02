const parseLine = (line: string) => parseInt(line, 10);

function _countIncreases(measurements: number[]) {
  return measurements.reduce((increasesCount, measurement, index) => {
    const nextMeasurement = measurements[index + 1];
    return nextMeasurement && measurement < nextMeasurement
      ? increasesCount + 1
      : increasesCount;
  }, 0);
}

export function countIncreases(lines: string[]) {
  const measurements = lines.map(parseLine);
  return _countIncreases(measurements);
}

export function countSlidingWindowIncreases(lines: string[]) {
  const measurements = lines.map(parseLine);

  const slidingWindowMeasurements = measurements
    .slice(0, -2)
    .map((measurement, index) => measurement + measurements[index + 1] + measurements[index + 2]);

  return _countIncreases(slidingWindowMeasurements);
}
