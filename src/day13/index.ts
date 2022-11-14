const parseDotString = (dotString: string) => {
  const [x, y] = dotString.split(",").map((dotPart) => parseInt(dotPart, 10));

  return { x, y };
};

type Fold = {
  readonly axis: "x" | "y";
  readonly value: number;
};

const parseFoldString = (foldString: string): Fold => {
  const [axis, valueString] = foldString.split(" ").pop()!.split("=");

  if (axis !== "x" && axis !== "y") {
    throw new Error(`Invalid fold: ${foldString}`);
  }

  return {
    axis,
    value: parseInt(valueString, 10),
  };
};

const getFoldedDot = (
  x: number,
  y: number,
  fold: Fold
): { x: number; y: number } => {
  switch (fold.axis) {
    case "x":
      return { x: Math.abs(x - fold.value), y };
    case "y":
      return { x, y: Math.abs(y - fold.value) };
  }
};

function print(dotStrings: Iterable<string>): void {
  const grid: string[][] = [];

  for (const dotString of dotStrings) {
    const { x, y } = parseDotString(dotString);
    grid[y] = grid[y] ?? [];
    grid[y][x] = "#";
  }
  console.dir(grid);
  grid.forEach((line) => {
    const lineString = [];
    for (let i = 0; i < line.length; ++i) {
      lineString.push(line[i] ?? " ");
    }
    console.log(lineString.join(""));
  });
}

const buildDotString = (dot: { x: number; y: number }) =>
  [dot.x, dot.y].join(",");

export function findCode(inputLines: string[]) {
  const separatorIndex = inputLines.indexOf("");
  const dotStrings = inputLines.slice(0, separatorIndex);
  const firstFold = parseFoldString(inputLines[separatorIndex + 1]);

  const visibleDotStrings = dotStrings.reduce(
    (visibleDotStrings, dotString) => {
      const { x, y } = parseDotString(dotString);
      visibleDotStrings.add(buildDotString(getFoldedDot(x, y, firstFold)));
      return visibleDotStrings;
    },
    new Set<string>()
  );

  print(visibleDotStrings);

  return visibleDotStrings.size;
}
