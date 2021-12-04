function countOnes(binaryNumberStrings: string[]): number[] {
  const oneCounts: number[] = Array.from({length: binaryNumberStrings[0].length}, () => 0);

  binaryNumberStrings.forEach((binaryNumberString) => {
    const bitStrings = binaryNumberString.split('');
    bitStrings.forEach((bitString, bitIndex) => {
      if (bitString === '1') {
        ++oneCounts[bitIndex];
      }
    });
  });

  return oneCounts;
}

function getGammaRate(binaryNumberStrings: string[]): number {
  const oneCounts = countOnes(binaryNumberStrings);

  const gammaRateString = oneCounts
    .map((oneCount) => oneCount >= binaryNumberStrings.length / 2 ? '1' : '0')
    .join('');

  return parseInt(gammaRateString, 2);
}

const getEpsilonRate = (gammaRate: number, digits: number) => ~gammaRate & (Math.pow(2, digits) - 1);

export function getPowerConsumption(binaryNumberStrings: string[]): number {
  const gammaRate = getGammaRate(binaryNumberStrings);
  const epsilonRate = getEpsilonRate(gammaRate, binaryNumberStrings[0].length);
  return gammaRate * epsilonRate;
}

// TODO solved, but not formalized yet
export function foo(binaryNumberStrings: string[], digit: number = 0): string {
  console.log(binaryNumberStrings);
  if (binaryNumberStrings.length === 1) {
    return binaryNumberStrings[0];
  }

  const onesCount = binaryNumberStrings
    .map((binaryNumberString) => binaryNumberString.charAt(digit))
    .reduce((onesCount, bit) => onesCount + (bit === '1' ? 1 : 0), 0);

  // Toggle these lines to find each "rating" value. I'm not sure yet why this is what makes the difference...
  const discriminator = (onesCount >= (binaryNumberStrings.length / 2)) ? '1' : '0';
  // const discriminator = (onesCount >= (binaryNumberStrings.length / 2)) ? '0' : '1';

  return foo(
    binaryNumberStrings
      .filter((binaryNumberString) => binaryNumberString.charAt(digit) === discriminator),
    ++digit
  );
}