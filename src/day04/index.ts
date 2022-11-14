const BOARD_SIZE = 5;

class Board {
  private rowsAndColumnsByNumber = new Map<
    number,
    { row: Set<number>; column: Set<number> }
  >();
  private rows = Array.from({ length: BOARD_SIZE }, () => new Set<number>());
  private columns = Array.from({ length: BOARD_SIZE }, () => new Set<number>());

  constructor(lines: string[]) {
    lines.forEach((line, rowIndex) => {
      line
        .trim()
        .split(/\s+/)
        .forEach((numberString, columnIndex) => {
          const number = parseInt(numberString, 10);
          const row = this.rows[rowIndex];
          const column = this.columns[columnIndex];

          row.add(number);
          column.add(number);
          this.rowsAndColumnsByNumber.set(number, { row, column });
        });
    });
  }

  mark(number: number) {
    if (this.rowsAndColumnsByNumber.has(number)) {
      const { row, column } = this.rowsAndColumnsByNumber.get(number)!;
      row.delete(number);
      column.delete(number);
      this.rowsAndColumnsByNumber.delete(number);
    }
  }

  isWon() {
    return (
      this.rows.some((row) => row.size === 0) ||
      this.columns.some((column) => column.size === 0)
    );
  }

  getScore() {
    let score = 0;
    for (const number of this.rowsAndColumnsByNumber.keys()) {
      score += number;
    }
    return score;
  }
}

export function bingo(lines: string[]) {
  const [numberLine, ...boardLines] = lines;

  const numbers = numberLine
    .split(",")
    .map((numberString) => parseInt(numberString, 10));

  const boards = boardLines
    .reduce((boards: string[][], boardLine: string) => {
      if (boardLine.length === 0) {
        boards.push([]);
        return boards;
      } else {
        const board = boards[boards.length - 1];
        board.push(boardLine);
        return boards;
      }
    }, [])
    .map((board) => new Board(board));

  const remainingBoards = new Set(boards);

  for (const number of numbers) {
    for (const board of remainingBoards) {
      board.mark(number);

      if (board.isWon()) {
        remainingBoards.delete(board);
        if (remainingBoards.size === 0) {
          return number * board.getScore();
        }
      }
    }
  }
}
