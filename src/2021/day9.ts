const testInput = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function calculateMinimums(heightMap: number[][]) {
  return heightMap.reduce<number[]>((minimums, row, yIndex) => {
    return [
      ...minimums,
      ...row.reduce<number[]>((rowMinimums, value, xIndex) => {
        if (
          directions
            .map((direction) => {
              const x = direction[0] + xIndex;
              const y = direction[1] + yIndex;
              if (x < 0 || x >= row.length || y < 0 || y >= heightMap.length) {
                return true;
              }
              return value < heightMap[y][x];
            })
            .every((v) => v)
        ) {
          rowMinimums.push(value);
        }
        return rowMinimums;
      }, []),
    ];
  }, []);
}

function calculateMinimumsCoordinates(heightMap: number[][]) {
  return heightMap.reduce<number[][]>((minimums, row, yIndex) => {
    return [
      ...minimums,
      ...row.reduce<number[][]>((rowMinimums, value, xIndex) => {
        if (
          directions
            .map((direction) => {
              const x = direction[0] + xIndex;
              const y = direction[1] + yIndex;
              if (x < 0 || x >= row.length || y < 0 || y >= heightMap.length) {
                return true;
              }
              return value < heightMap[y][x];
            })
            .every((v) => v)
        ) {
          rowMinimums.push([xIndex, yIndex]);
        }
        return rowMinimums;
      }, []),
    ];
  }, []);
}

function part1(input: Array<string>) {
  const heightMap = input.map((row) =>
    row.split("").map((value) => parseInt(value))
  );
  return calculateMinimums(heightMap).reduce((a, b) => a + b + 1, 0);
}

function part2(input: Array<string>) {
  const heightMap = input.map((row) =>
    row.split("").map((value) => parseInt(value))
  );
  const xLimit = heightMap[0].length;
  const yLimit = heightMap.length;
  return calculateMinimumsCoordinates(heightMap)
    .map((minimum) => {
      const queue = [minimum];
      const visitedCoordinates = new Set<string>([minimum.join(",")]);
      let count = 0;
      while (queue.length !== 0) {
        const [x, y] = queue.pop() as number[];
        ++count;
        if (heightMap[y][x] !== 9) {
          const newChecks = directions.reduce<number[][]>(
            (nextCheck, direction) => {
              const newX = direction[0] + x;
              const newY = direction[1] + y;
              if (newX < 0 || newX >= xLimit || newY < 0 || newY >= yLimit) {
                return nextCheck;
              }
              const newCoordstr = [newX, newY].join(",");
              if (visitedCoordinates.has(newCoordstr)) {
                return nextCheck;
              }
              visitedCoordinates.add(newCoordstr);
              if (heightMap[newY][newX] !== 9) {
                nextCheck.push([newX, newY]);
              }
              return nextCheck;
            },
            []
          );
          queue.push(...newChecks);
        }
      }
      return count;
    })
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
}

export { part1, part2 };
