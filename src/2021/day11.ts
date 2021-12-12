const testInput = [
  "5483143223",
  "2745854711",
  "5264556173",
  "6141336146",
  "6357385478",
  "4167524645",
  "2176841721",
  "6882881134",
  "4846848554",
  "5283751526",
];

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

function inRange(a: number, b: number, v: number): boolean {
  return v >= a && v <= b;
}

function executeIteration(map: number[][]): { map: number[][]; flash: number } {
  const flashedQueue: [number, number][] = [];
  let incrementedMatrix = map.map((row, rowIndex) =>
    row.map((value, columnIndex) => {
      if (++value > 9) {
        flashedQueue.push([rowIndex, columnIndex]);
      }
      return value;
    })
  );
  const flashedSet = new Set<string>(
    flashedQueue.map((value) => `${value[0]},${value[1]}`)
  );
  while (flashedQueue.length > 0) {
    const [rowIndex, columnIndex] = flashedQueue.pop() as [number, number];
    incrementedMatrix[rowIndex][columnIndex] = 0;
    directions.forEach((direction) => {
      const x = rowIndex + direction[0];
      const y = columnIndex + direction[1];
      if (
        inRange(0, 9, x) &&
        inRange(0, 9, y) &&
        !flashedSet.has(`${x},${y}`)
      ) {
        if (++incrementedMatrix[x][y] > 9) {
          flashedQueue.push([x, y]);
          flashedSet.add(`${x},${y}`);
        }
      }
    });
  }

  return { map: incrementedMatrix, flash: flashedSet.size };
}

function part1(input: Array<string>) {
  let squidMatrix = input.map((row) =>
    row.split("").map((value) => parseInt(value))
  );

  let score = 0;
  for (let _i = 0; _i < 100; ++_i) {
    const { map, flash } = executeIteration(squidMatrix);
    squidMatrix = map;
    score += flash;
  }

  return score;
}

function part2(input: Array<string>) {
  let squidMatrix = input.map((row) =>
    row.split("").map((value) => parseInt(value))
  );

  let found = false;
  let itCount = 0;
  while (!found) {
    const { map, flash } = executeIteration(squidMatrix);
    squidMatrix = map;
    ++itCount;
    if (flash === 100) {
      found = true;
    }
  }

  return itCount;
}

export { part1, part2 };
