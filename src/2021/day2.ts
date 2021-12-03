import { parseCommandLine } from "typescript";

interface Coord {}

function part1(input: Array<string>) {
  const finalCoord = input.reduce<{
    horizontal: number;
    depth: number;
  }>(
    (coord, command) => {
      const [verb, value] = command.split(" ");
      switch (verb) {
        case "forward":
          return {
            ...coord,
            horizontal: coord.horizontal + parseInt(value),
          };
        case "down":
          return {
            ...coord,
            depth: coord.depth + parseInt(value),
          };
        case "up":
          return {
            ...coord,
            depth: coord.depth - parseInt(value),
          };
        default:
          return coord;
      }
    },
    { horizontal: 0, depth: 0 }
  );
  return finalCoord.horizontal * finalCoord.depth;
}

function part2(input: Array<string>) {
  const finalCoord = input.reduce<{
    horizontal: number;
    depth: number;
    aim: number;
  }>(
    (coord, command) => {
      const [verb, value] = command.split(" ");
      switch (verb) {
        case "forward":
          return {
            ...coord,
            horizontal: coord.horizontal + parseInt(value),
            depth: coord.depth + parseInt(value) * coord.aim,
          };
        case "down":
          return {
            ...coord,
            aim: coord.aim + parseInt(value),
          };
        case "up":
          return {
            ...coord,
            aim: coord.aim - parseInt(value),
          };
        default:
          return coord;
      }
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
  return finalCoord.horizontal * finalCoord.depth;
}

export { part1, part2 };
