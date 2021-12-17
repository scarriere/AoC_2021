const testInput = ["target area: x=20..30, y=-10..-5"];

const solutions = [
  "23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5",
  "25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7",
  "8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6",
  "26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3",
  "20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8",
  "25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7",
  "25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6",
  "8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4",
  "24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5",
  "7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3",
  "23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5",
  "27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5",
  "8,-2    27,-8   30,-5   24,-7",
];

function parseInput(input: string) {
  const tokens = input.split(" ");
  const xTokens = tokens[2].slice(2, tokens[2].length).split("..");
  const yTokens = tokens[3].slice(2, tokens[3].length).split("..");
  return {
    x: [parseInt(xTokens[0]), parseInt(xTokens[1])],
    y: [parseInt(yTokens[0]), parseInt(yTokens[1])],
  };
}

// Not factorial just the sum of all numbers from 1 to x
function factorial(value: number) {
  return (value * (value + 1)) / 2;
}
// Not factorial just the sum of all numbers from 1 to x
function reverseFactorial(value: number) {
  const discriminant = 1 + 8 * value;
  return Math.ceil((-1 + Math.sqrt(discriminant)) / 2);
}

function part1(input: Array<string>) {
  return factorial(Math.abs(parseInput(input[0]).y[0]) - 1);
}

function part2(input: Array<string>) {
  const zone = parseInput(input[0]);
  const limits = {
    x: [reverseFactorial(zone.x[0]), zone.x[1]],
    y: [zone.y[0], Math.abs(zone.y[0]) - 1],
  };
  const possibleShots: string[] = [];
  for (let x = limits.x[0]; x <= limits.x[1]; ++x) {
    for (let y = limits.y[0]; y <= limits.y[1]; ++y) {
      let point = { x: 0, y: 0 };
      let currentX = x;
      let currentY = y;
      while (point.x < zone.x[1] && point.y > zone.y[0]) {
        point.x += currentX;
        point.y += currentY;
        if (
          point.x >= zone.x[0] &&
          point.x <= zone.x[1] &&
          point.y >= zone.y[0] &&
          point.y <= zone.y[1]
        ) {
          possibleShots.push(`${x},${y}`);
          break;
        }
        currentX = Math.max(currentX - 1, 0);
        --currentY;
      }
    }
  }
  return possibleShots.length;
}

export { part1, part2 };
