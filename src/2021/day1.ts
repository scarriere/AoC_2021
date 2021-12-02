function part1(input: Array<string>) {
  return input
    .map((i) => parseInt(i))
    .reduce((acc, value, index, array) => {
      return value > array[index - 1] ? ++acc : acc;
    }, 0);
}

function part2(input: Array<string>) {
  return input
    .map((i) => parseInt(i))
    .reduce((acc, value, index, array) => {
      return array[index + 3] && value < array[index + 3] ? ++acc : acc;
    }, 0);
}

export { part1, part2 };
