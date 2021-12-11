type Point = {
  readonly column: number;
  readonly row: number;
};

class Line {
  readonly startPoint: Point;
  readonly endPoint: Point;

  constructor(firstPoint: Point, secondPoint: Point) {
    if ((firstPoint.row === secondPoint.row && firstPoint.column > secondPoint.column) ||
        (firstPoint.column === secondPoint.column && firstPoint.row > secondPoint.row)) {
      this.startPoint = secondPoint;
      this.endPoint = firstPoint;
    }
    else {
      this.startPoint = firstPoint;
      this.endPoint = secondPoint;
    }
  }

  isHorizontal(): boolean {
    return this.startPoint.row === this.endPoint.row;
  }

  isVertical(): boolean {
    return this.startPoint.column === this.endPoint.column;
  }
};

const parseLine = (inputLine: string): Line => {
  const [start, end] = inputLine
    .split(/\s+->\s+/)
    .map((pointString): Point => {
      const [column, row] = pointString.split(',').map((n) => parseInt(n, 10));
      return {column, row};
    });

  return new Line(start, end);
};

function buildMap(lines: Line[]) {
  const map = Array.from({length: 10}, () => Array.from({length: 10}, () => '.'));
  lines.forEach((line, index) => {
    if (line.isHorizontal()) {
      for(let col = line.startPoint.column; col <= line.endPoint.column; ++col) {
        map[line.startPoint.row][col] = `${index}`;
      }
    }
    else if (line.isVertical()) {
      for(let row = line.startPoint.row; row <= line.endPoint.row; ++row) {
        map[row][line.startPoint.column] = `${index}`;
      }
    }
  });
  return map;
}

function printHorizontalLines(line: Line, otherLine: Line) {
  console.log('+==========+');
  console.log('|'
    + ' '.repeat(line.startPoint.column)
    + '-'.repeat(line.endPoint.column - line.startPoint.column + 1)
    + ' '.repeat(9 - line.endPoint.column)
    + '|');
  console.log('|'
    + ' '.repeat(otherLine.startPoint.column)
    + '-'.repeat(otherLine.endPoint.column - otherLine.startPoint.column + 1)
    + ' '.repeat(9 - otherLine.endPoint.column)
    + '|');
  console.log('+==========+');
}

export function foo(inputLines: string[]) {
  const horizontalLines: Line[] = [];
  const verticalLines: Line[] = [];

  inputLines.forEach((inputLine) => {
    const ventLine = parseLine(inputLine);
    
    if (ventLine.isHorizontal()) {
      horizontalLines.push(ventLine);
    }
    else if (ventLine.isVertical()) {
      verticalLines.push(ventLine);
    }
  });

  console.table(buildMap(horizontalLines.concat(verticalLines)));

  const horizontalOverlapLines: Line[] = [];
  for (let lineIndex = 0;lineIndex < horizontalLines.length; ++lineIndex) {
    const line = horizontalLines[lineIndex];

    for (let otherLineIndex = lineIndex + 1; otherLineIndex < horizontalLines.length; ++otherLineIndex) {
      const otherLine = horizontalLines[otherLineIndex];

      if (line != otherLine &&
          line.startPoint.row === otherLine.startPoint.row &&
          ( line.startPoint.column <= otherLine.startPoint.column || // this still isn't right...
            line.endPoint.column >= otherLine.startPoint.column)) {

        horizontalOverlapLines.push(new Line(
          { row: line.startPoint.row, column: Math.max(line.startPoint.column, otherLine.startPoint.column) },
          { row: line.startPoint.row, column: Math.min(line.endPoint.column, otherLine.endPoint.column) }
        ));
        // printHorizontalLines(line, otherLine);
      }
    };
  };

  console.table(buildMap(horizontalOverlapLines));

  console.dir({verticalLines, horizontalLines}, {depth: 3});
}