`start-A
start-b
A-c
A-b
b-d
A-end
b-end`
  .split("\n")
  .reduce((connectionMap, connectionLine) => {
    const [cave1, cave2] = connectionLine.split("-");

    if (cave1 !== "end" && !connectionMap.has(cave1)) {
      connectionMap.set(cave1, []);
    }
    if (cave2 !== "end" && !connectionMap.has(cave2)) {
      connectionMap.set(cave2, []);
    }

    if (cave1 !== "end" && cave2 !== "start") {
      connectionMap.get(cave1).push(cave2);
    }
    if (cave2 !== "end" && cave1 !== "start") {
      connectionMap.get(cave2).push(cave1);
    }

    return connectionMap;
  }, new Map());

function walk({ currentPath, paths, connectionMap }) {
  const currentCave = currentPath[currentPath.length - 1];

  if (currentCave === "end") {
    paths.push([...currentPath]);
    return;
  }

  connectionMap.get(currentCave).forEach((nextCave) => {
    if (
      !(
        nextCave !== "end" &&
        nextCave === nextCave.toLowerCase() &&
        currentPath.includes(nextCave)
      )
    ) {
      walk({
        currentPath: [...currentPath, nextCave],
        paths,
        connectionMap,
      });
    }
  });
}

let paths = [];
walk({
  currentPath: ["start"],
  paths,
  connectionMap: example1ConnectionMap,
});
paths;

/***** part2 - works for the first exmaple... but not for the second... *****/
function walk2({ currentPath, paths, connectionMap }) {
  const currentCave = currentPath[currentPath.length - 1] || "start";

  for (const nextCave of connectionMap.get(currentCave)) {
    if (nextCave === "end") {
      paths.push([...currentPath]);
      return;
    }

    const visitedSmallCaves = currentPath.filter(
      (cave) => cave === cave.toLowerCase()
    );

    const smallCaveVisitedTwice =
      visitedSmallCaves.length !== new Set(visitedSmallCaves).size;

    if (
      nextCave === nextCave.toUpperCase() ||
      !smallCaveVisitedTwice ||
      !currentPath.includes(nextCave)
    ) {
      walk2({
        currentPath: [...currentPath, nextCave],
        paths,
        connectionMap,
      });
    }
  }
}

let paths = [];
walk({
  currentPath: [],
  paths,
  connectionMap: example1ConnectionMap,
});
paths;
