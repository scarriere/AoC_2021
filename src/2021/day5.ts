function part1(input: Array<string>) {
  const vents = input
    .map((lineStr) =>
      lineStr
        .split(" -> ")
        .map((pointStr) => pointStr.split(",").map((v) => parseInt(v)))
    )
    .filter((line) => line[0][0] === line[1][0] || line[0][1] === line[1][1])
    .reduce(
      (acc, current) => {
        const [pt1, pt2] = current;
        const lineLength = Math.max(
          Math.abs(pt2[0] - pt1[0]),
          Math.abs(pt2[1] - pt1[1])
        );
        const directions = [
          getDirection(pt1[0], pt2[0]),
          getDirection(pt1[1], pt2[1]),
        ];
        for (let i = 0; i <= lineLength; ++i) {
          addPoint(
            pt1[0] + directions[0] * i,
            pt1[1] + directions[1] * i,
            acc.data
          );
          if (
            acc.data[pt1[0] + directions[0] * i][pt1[1] + directions[1] * i] ===
            2
          ) {
            ++acc.score;
          }
        }
        return acc;
      },
      { data: [[]], score: 0 }
    );
  return vents.score;
}

function addPoint(x: number, y: number, numbers: number[][]) {
  if (!numbers[x]) {
    numbers[x] = [];
  }
  if (!numbers[x][y]) {
    numbers[x][y] = 1;
  } else {
    ++numbers[x][y];
  }
  return numbers;
}

function part2(input: Array<string>) {
  const vents = input
    .map((lineStr) =>
      lineStr
        .split(" -> ")
        .map((pointStr) => pointStr.split(",").map((v) => parseInt(v)))
    )
    .reduce(
      (acc, current) => {
        const [pt1, pt2] = current;
        const lineLength = Math.max(
          Math.abs(pt2[0] - pt1[0]),
          Math.abs(pt2[1] - pt1[1])
        );
        const directions = [
          getDirection(pt1[0], pt2[0]),
          getDirection(pt1[1], pt2[1]),
        ];
        for (let i = 0; i <= lineLength; ++i) {
          addPoint(
            pt1[0] + directions[0] * i,
            pt1[1] + directions[1] * i,
            acc.data
          );
          if (
            acc.data[pt1[0] + directions[0] * i][pt1[1] + directions[1] * i] ===
            2
          ) {
            ++acc.score;
          }
        }
        return acc;
      },
      { data: [[]], score: 0 }
    );
  return vents.score;
}

function getDirection(a: number, b: number) {
  if (a === b) return 0;
  return a > b ? -1 : 1;
}

export { part1, part2 };
