const commandDirections = ["forward", "down", "up"] as const;

type Direction = typeof commandDirections[number];

interface Command {
  direction: Direction,
  units: number
}

interface Position {
  horizontalPosition: number,
  depth: number
}

function isDirection(str: string): str is Direction {
  return commandDirections.includes(str as Direction);
}

const parseLine = (line: string): Command => {
  const [ direction, unitsString ] = line.split(/\s+/);

  if (!isDirection(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }

  return {
    direction,
    units: parseInt(unitsString, 10)
  };
};

function calculatePosition(commands: Command[]): Position {
  const position: Position = {
    horizontalPosition: 0,
    depth: 0
  };

  for (const command of commands) {
    switch (command.direction) {
      case "forward": position.horizontalPosition += command.units; break;
      case "down":    position.depth += command.units;              break;
      case "up":      position.depth -= command.units;              break;
    }
  }

  return position;
}

export function calculatePositionProduct(lines: string[]): number {
  const commands = lines.map(parseLine);
  const position: Position = calculatePosition(commands);
  return position.depth * position.horizontalPosition;
}

function calculateAimedPosition(commands: Command[]): Position {
  let aim = 0;
  
  const position: Position = {
    horizontalPosition: 0,
    depth: 0
  };

  for (const command of commands) {
    switch (command.direction) {
      case "down":    aim += command.units; break;
      case "up":      aim -= command.units; break;
      case "forward":
        position.horizontalPosition += command.units;
        position.depth += aim * command.units;
        break;
    }
  }

  return position;
}

export function calculateAimedPositionProduct(lines: string[]): number {
  const commands = lines.map(parseLine);
  const position: Position = calculateAimedPosition(commands);
  return position.depth * position.horizontalPosition;
}