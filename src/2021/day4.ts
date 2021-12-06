function part1(input: Array<string>) {
  const randomSeq = input[0].split(",");
  const boards = createBoards(input);
  for (let numberDraw of randomSeq) {
    for (let board of boards) {
      if (board.data[numberDraw]) {
        ++board.score[0][board.data[numberDraw][0]];
        ++board.score[1][board.data[numberDraw][1]];
        board.sum -= parseInt(numberDraw);
        if (
          board.score[0][board.data[numberDraw][0]] === 5 ||
          board.score[1][board.data[numberDraw][1]] === 5
        ) {
          return board.sum * parseInt(numberDraw);
        }
      }
    }
  }
}

const baseGridScore = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
] as [number[], number[]];

interface Board {
  data: Record<string, [number, number]>;
  score: [number[], number[]];
  sum: number;
  won?: boolean;
}

function createBoards(input: Array<string>): Board[] {
  const boards = [] as Board[];
  let currentBoard = {} as Record<string, [number, number]>;
  let rowIdx = 0;
  let currentSum = 0;
  for (let i = 2; i < input.length; ++i) {
    const value = input[i];
    if (value === "") {
      boards.push({
        data: currentBoard,
        score: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        sum: currentSum,
      });
      currentBoard = {};
      rowIdx = 0;
      currentSum = 0;
    } else {
      const numbers = value
        .split(" ")
        .filter((v) => v !== "")
        .reduce(
          (acc, current, index) => {
            acc.data[current] = [rowIdx, index];
            acc.sum += parseInt(current);
            return acc;
          },
          { data: {} as Record<string, [number, number]>, sum: 0 }
        );
      currentBoard = { ...currentBoard, ...numbers.data };
      ++rowIdx;
      currentSum += numbers.sum;
    }
  }
  return boards;
}

function part2(input: Array<string>) {
  const randomSeq = input[0].split(",");
  const boards = createBoards(input);
  let winningBoardsCount = 0;
  for (let numberDraw of randomSeq) {
    for (let board of boards) {
      if (board.won) {
        continue;
      }
      if (board.data[numberDraw]) {
        ++board.score[0][board.data[numberDraw][0]];
        ++board.score[1][board.data[numberDraw][1]];
        board.sum -= parseInt(numberDraw);
        if (
          board.score[0][board.data[numberDraw][0]] === 5 ||
          board.score[1][board.data[numberDraw][1]] === 5
        ) {
          board.won = true;
          ++winningBoardsCount;
          if (winningBoardsCount === boards.length) {
            return board.sum * parseInt(numberDraw);
          }
        }
      }
    }
  }
}

export { part1, part2 };
