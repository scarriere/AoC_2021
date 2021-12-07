function part1(input: Array<string>) {
  const crabs = input[0].split(",").map((v) => parseInt(v));

  const max = Math.max(...crabs);
  const min = Math.min(...crabs);

  const costArray = crabs.reduce((acc, crab) => {
    for (let i = 1; i <= max - crab; ++i) {
      acc[crab + i] ? (acc[crab + i] += i) : (acc[crab + i] = i);
    }
    for (let i = 1; i <= crab - min; ++i) {
      acc[crab - i] ? (acc[crab - i] += i) : (acc[crab - i] = i);
    }
    return acc;
  }, [] as number[]);

  return Math.min(...costArray);
}

function part2(input: Array<string>) {
  const crabs = input[0].split(",").map((v) => parseInt(v));

  const max = Math.max(...crabs);
  const min = Math.min(...crabs);

  const costArray = crabs.reduce((acc, crab) => {
    let gazSum = 0;
    for (let i = 1; i <= max - crab; ++i) {
      gazSum += i;
      acc[crab + i] ? (acc[crab + i] += gazSum) : (acc[crab + i] = gazSum);
    }
    gazSum = 0;
    for (let i = 1; i <= crab - min; ++i) {
      gazSum += i;
      acc[crab - i] ? (acc[crab - i] += gazSum) : (acc[crab - i] = gazSum);
    }
    return acc;
  }, [] as number[]);

  return Math.min(...costArray);
}

export { part1, part2 };
