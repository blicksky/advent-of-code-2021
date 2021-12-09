/* Part 1
input.split('\n')
  .flatMap((line) => line.split(/\s*\|\s*/)[1].split(/\s+/))
  .filter((digit) => [2,4,3,7].includes(digit.length))
  .length;
*/

/* Part 2
`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`
  .split('\n')
  .map((line) => {
    const [signalPatterns, outputDigits] = line
      .split(/\s*\|\s*/)
      .map((part) => part
        .split(/\s+/)
        .map((term) => new Set(term.split('')))
      );

    const one = signalPatterns.find((p) => p.size === 2);
    const four = signalPatterns.find((p) => p.size === 4);
    const seven = signalPatterns.find((p) => p.size === 3);
    const eight = signalPatterns.find((p) => p.size === 7);

    const _235 = signalPatterns.filter((p) => p.size === 5);

    const three = _235.find((p) => [...one].every((x) => p.has(x)));
    const _25 = _235.filter((p) => p !== three);

    const horizontalSegments = new Set([...three].filter((x) => !one.has(x)));

    const _960 = signalPatterns.filter((p) => p.size === 6);

    const zero = _960.find((p) => ![...horizontalSegments].every((x) => p.has(x))); 
    const _96 = _960.filter((p) => p !== zero);

    const nine = _96.find((p) => [...four].every((x) => p.has(x)));
    const six = _96.find((p) => p !== nine);

    const five = _25.find((p) => [...p].every((x) => nine.has(x)));
    const two = _25.find((p) => p !== five);

    const outputValue = outputDigits.map((digit) => {
        return [zero, one, two, three, four, five, six, seven, eight, nine].findIndex((number) => number.size === digit.size && [...digit].every((x) => number.has(x)));
    });

    return parseInt(outputValue.join(''), 10);
  })
  .reduce((sum, value) => sum + value);
*/
