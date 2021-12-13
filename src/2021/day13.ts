const testInput = [
  "6,10",
  "0,14",
  "9,10",
  "0,3",
  "10,4",
  "4,11",
  "6,0",
  "6,12",
  "4,1",
  "0,13",
  "10,12",
  "3,4",
  "3,0",
  "8,4",
  "1,10",
  "2,14",
  "8,10",
  "9,0",
  "",
  "fold along y=7",
  "fold along x=5",
];

interface InputMap {
  dots: Set<string>;
  commands: [string, number][];
}

function executeCommand(dots: Set<string>, command: [string, number]) {
  const index = command[0] === "x" ? 0 : 1;
  return new Set(
    [...dots].map((value) => {
      const parsedValue = value.split(",").map((v) => parseInt(v));
      if (parsedValue[index] > command[1]) {
        parsedValue[index] = 2 * command[1] - parsedValue[index];
      }
      return parsedValue.join(",");
    })
  );
}

function part1(input: Array<string>) {
  const parsedInput = input.reduce<InputMap>(
    (acc, value) => {
      if (value === "") return acc;
      if (value.includes("fold")) {
        const commandTokens = value.split(" ")[2].split("=");
        acc.commands.push([commandTokens[0], parseInt(commandTokens[1])]);
      } else {
        const splitValue = value.split(",");
        acc.dots.add(value);
      }
      return acc;
    },
    {
      dots: new Set([]),
      commands: [],
    }
  );

  return executeCommand(parsedInput.dots, parsedInput.commands[0]).size;
}

function displayMap(dots: Set<string>) {
  let limits = [0, 0];
  const stringMap = [...dots].reduce<string[][]>((map, dot) => {
    const [x, y] = dot.split(",").map((v) => parseInt(v));
    if (!map[x]) {
      map[x] = [];
    }
    map[x][y] = "#";
    limits = [Math.max(limits[0], x), Math.max(limits[1], y)];
    return map;
  }, []);
  for (let i = 0; i <= limits[1]; ++i) {
    let row = "";
    for (let j = 0; j <= limits[0]; ++j) {
      row += (stringMap[j] && stringMap[j][i]) || ".";
    }
    console.log(row);
  }
}

function part2(input: Array<string>) {
  const parsedInput = input.reduce<InputMap>(
    (acc, value) => {
      if (value === "") return acc;
      if (value.includes("fold")) {
        const commandTokens = value.split(" ")[2].split("=");
        acc.commands.push([commandTokens[0], parseInt(commandTokens[1])]);
      } else {
        const splitValue = value.split(",");
        acc.dots.add(value);
      }
      return acc;
    },
    {
      dots: new Set([]),
      commands: [],
    }
  );

  const foldedMap = parsedInput.commands.reduce((map, command) => {
    return executeCommand(map, command);
  }, parsedInput.dots);

  return displayMap(foldedMap);
}

export { part1, part2 };
