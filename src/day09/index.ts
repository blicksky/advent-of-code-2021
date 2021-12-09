/* part 1

`2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n').map((line) => [...line]).map((heightStrings, row) => {
    return heightStrings.map((heightString, col) => parseInt(heightString, 10));
})
    .reduce((totalRisk, heights, row, heightMap) => {
        return totalRisk + heights.reduce((rowRisk, height, col) => {
            if (height !== 9 &&
                (row === 0 || height < heightMap[row-1][col]) &&
                (row === heightMap.length - 1 || height < heightMap[row+1][col]) &&
                (col === 0 || height < heightMap[row][col-1]) &&
                (col === heights.length - 1 || height < heightMap[row][col+1])
            ) {
                return rowRisk + height + 1;
            }
            return rowRisk;
        }, 0);
    }, 0);

*/