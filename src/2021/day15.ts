import { parse } from "path/posix";

const testInput = [
  "1163751742",
  "1381373672",
  "2136511328",
  "3694931569",
  "7463417111",
  "1319128137",
  "1359912421",
  "3125421639",
  "1293138521",
  "2311944581",
];

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function parseMap(input: Array<string>) {
  return input.map((row) => row.split("").map((v) => parseInt(v)));
}

function part1(input: Array<string>) {
  const map = parseMap(input);
  const rowLimit = map.length;
  const colLimit = map[0].length;
  const visitedSore: number[][] = [[0]];
  const start = [0, 0];
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current) {
      const newPos = directions
        .map((d) => [current[0] + d[0], current[1] + d[1]])
        .filter(
          (v) => v[0] >= 0 && v[0] < rowLimit && v[1] >= 0 && v[1] < colLimit
        )
        .filter((v) => {
          const prevScore = visitedSore[v[0]] && visitedSore[v[0]][v[1]];
          return (
            prevScore === undefined ||
            prevScore > visitedSore[current[0]][current[1]] + map[v[0]][v[1]]
          );
        });
      queue.push(...newPos);
      newPos.forEach((v) => {
        if (visitedSore[v[0]] === undefined) {
          visitedSore[v[0]] = [];
        }
        visitedSore[v[0]][v[1]] =
          visitedSore[current[0]][current[1]] + map[v[0]][v[1]];
      });
    }
  }

  return visitedSore[rowLimit - 1][colLimit - 1];
}

function increaseAndReset(value: number, increase: number) {
  value += increase;
  return value > 9 ? value - 9 : value;
}

function part2(input: Array<string>) {
  const map = parseMap(input).map((row) => [
    ...row,
    ...row.map((v) => increaseAndReset(v, 1)),
    ...row.map((v) => increaseAndReset(v, 2)),
    ...row.map((v) => increaseAndReset(v, 3)),
    ...row.map((v) => increaseAndReset(v, 4)),
  ]);

  const extendedMap = [
    ...map,
    ...map.map((row) => row.map((v) => increaseAndReset(v, 1))),
    ...map.map((row) => row.map((v) => increaseAndReset(v, 2))),
    ...map.map((row) => row.map((v) => increaseAndReset(v, 3))),
    ...map.map((row) => row.map((v) => increaseAndReset(v, 4))),
  ];

  const rowLimit = extendedMap.length;
  const colLimit = extendedMap[0].length;
  const visitedSore: number[][] = [[0]];
  const start = [0, 0];
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current) {
      const newPos = directions
        .map((d) => [current[0] + d[0], current[1] + d[1]])
        .filter(
          (v) => v[0] >= 0 && v[0] < rowLimit && v[1] >= 0 && v[1] < colLimit
        )
        .filter((v) => {
          const prevScore = visitedSore[v[0]] && visitedSore[v[0]][v[1]];
          return (
            prevScore === undefined ||
            prevScore >
              visitedSore[current[0]][current[1]] + extendedMap[v[0]][v[1]]
          );
        });
      queue.push(...newPos);
      newPos.forEach((v) => {
        if (visitedSore[v[0]] === undefined) {
          visitedSore[v[0]] = [];
        }
        visitedSore[v[0]][v[1]] =
          visitedSore[current[0]][current[1]] + extendedMap[v[0]][v[1]];
      });
    }
  }

  return visitedSore[rowLimit - 1][colLimit - 1];
}

export { part1, part2 };
