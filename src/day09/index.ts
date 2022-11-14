export function getRisk(inputLines: string[]) {
  return inputLines
    .map((line) => [...line])
    .map((heightStrings) => {
      return heightStrings.map((heightString) => parseInt(heightString, 10));
    })
    .reduce((totalRisk, heights, row, heightMap) => {
      return (
        totalRisk +
        heights.reduce((rowRisk, height, col) => {
          if (
            height !== 9 &&
            (row === 0 || height < heightMap[row - 1][col]) &&
            (row === heightMap.length - 1 ||
              height < heightMap[row + 1][col]) &&
            (col === 0 || height < heightMap[row][col - 1]) &&
            (col === heights.length - 1 || height < heightMap[row][col + 1])
          ) {
            return rowRisk + height + 1;
          }
          return rowRisk;
        }, 0)
      );
    }, 0);
}

/* part 2 (incomplete)

`2199943210
 3987894921
 9856789892
 8767896789
 9899965678`.split('\n').map((heights, row) => [...heights.matchAll(/([0-8]+)/g)].map((match) => ({basinRow: match[0], column: match.index})));

*/

type BasinPart = {
  basin: Basin | null;
  row: number;
  startColumn: number;
  endColumn: number;
};

class Basin extends Map<number, Array<BasinPart>> {
  addBasinPart(basinPart: BasinPart) {
    if (!this.has(basinPart.row)) {
      this.set(basinPart.row, []);
    }

    basinPart.basin = this;
    this.get(basinPart.row)?.push(basinPart);
  }
}

function findBasin(basins: Basin[], basinPart: BasinPart): Basin | undefined {
  return basins.find(
    (basin) =>
      basin.has(basinPart.row - 1) &&
      basin.get(basinPart.row - 1)?.find((matchingBasinPart) => {
        console.log(
          `${matchingBasinPart.row} ${" ".repeat(
            matchingBasinPart.startColumn
          )}${"-".repeat(matchingBasinPart.endColumn + 1)}`
        );
        console.log(
          `${basinPart.row} ${" ".repeat(basinPart.startColumn)}${"-".repeat(
            basinPart.endColumn + 1
          )}`
        );

        return (
          basinPart.startColumn <= matchingBasinPart.endColumn ||
          basinPart.endColumn >= matchingBasinPart.startColumn
        );
      })
  );
}

export function getBasins(inputLines: string[]) {
  const basins: Basin[] = [];

  inputLines.forEach((line, row) => {
    for (const match of line.matchAll(/[0-8]+/g)) {
      const lineBasinPart: BasinPart = {
        basin: null,
        row,
        startColumn: match.index!,
        endColumn: match.index! + match[0].length - 1,
      };

      const basin = findBasin(basins, lineBasinPart) ?? new Basin();
      basin.addBasinPart(lineBasinPart);

      basins.push(basin);
    }
  });

  // console.dir(basins, {depth: 3});
  // return basins;
}
