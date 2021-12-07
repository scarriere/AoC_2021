function part1(input: Array<string>) {
  const ITERATION_COUNT = 80;
  const initialAgeMap = input[0].split(",").reduce(
    (acc, age) => {
      ++acc[parseInt(age)];
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0]
  );
  let ageMap = initialAgeMap;
  for (let i = 0; i < ITERATION_COUNT; ++i) {
    ageMap = increaseAllAge(ageMap);
  }
  return ageMap.reduce((a, b) => a + b, 0);
}

function increaseAllAge(ages: number[]) {
  const first = ages[0];
  for (let i = 0; i < ages.length - 1; ++i) {
    ages[i] = ages[i + 1];
  }
  ages[6] += first;
  ages[8] = first;
  return ages;
}

function part2(input: Array<string>) {
  const ITERATION_COUNT = 256;
  const initialAgeMap = input[0].split(",").reduce(
    (acc, age) => {
      ++acc[parseInt(age)];
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0]
  );
  let ageMap = initialAgeMap;
  for (let i = 0; i < ITERATION_COUNT; ++i) {
    ageMap = increaseAllAge(ageMap);
  }
  return ageMap.reduce((a, b) => a + b, 0);
}

export { part1, part2 };
