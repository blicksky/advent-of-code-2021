const commandDirections = ["forward", "down", "up"] as const;

type Direction = typeof commandDirections[number];

interface Command {
  direction: Direction;
  units: number;
}

class Position {
  protected _horizontalPosition: number = 0;
  protected _depth: number = 0;

  get horizontalPosition() {
    return this._horizontalPosition;
  }

  get depth() {
    return this._depth;
  }

  moveForward(units: number) {
    this._horizontalPosition += units;
  }

  moveDown(units: number) {
    this._depth += units;
  }

  moveUp(units: number) {
    this._depth -= units;
  }
}

function isDirection(str: string): str is Direction {
  return commandDirections.includes(str as Direction);
}

const parseLine = (line: string): Command => {
  const [direction, unitsString] = line.split(/\s+/);

  if (!isDirection(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }

  return {
    direction,
    units: parseInt(unitsString, 10),
  };
};

function calculatePosition(commands: Command[]): Position {
  const position = new Position();

  for (const command of commands) {
    switch (command.direction) {
      case "forward":
        position.moveForward(command.units);
        break;
      case "down":
        position.moveDown(command.units);
        break;
      case "up":
        position.moveUp(command.units);
        break;
    }
  }

  return position;
}

export function calculatePositionProduct(lines: string[]): number {
  const commands = lines.map(parseLine);
  const position: Position = calculatePosition(commands);
  return position.depth * position.horizontalPosition;
}

class AimedPosition extends Position {
  private _aim: number = 0;

  get horizontalPosition() {
    return this._horizontalPosition;
  }

  get depth() {
    return this._depth;
  }

  moveForward(units: number) {
    this._horizontalPosition += units;
    this._depth += this._aim * units;
  }

  aimDown(units: number) {
    this._aim += units;
  }

  aimUp(units: number) {
    this._aim -= units;
  }
}

function calculateAimedPosition(commands: Command[]): Position {
  const position = new AimedPosition();

  for (const command of commands) {
    switch (command.direction) {
      case "down":
        position.aimDown(command.units);
        break;
      case "up":
        position.aimUp(command.units);
        break;
      case "forward":
        position.moveForward(command.units);
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
