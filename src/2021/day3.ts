function part1(input: Array<string>) {
  console.log(input.length);
  const mostUsedBit = input.reduce<number[]>((bitCounts, value) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "1") {
        bitCounts[i] ? (bitCounts[i] += 1) : (bitCounts[i] = 1);
      }
    }
    return bitCounts;
  }, []);
  const gamma = parseInt(
    mostUsedBit.map((count) => (count > input.length / 2 ? "1" : "0")).join(""),
    2
  );
  const epsilon = parseInt(
    mostUsedBit.map((count) => (count < input.length / 2 ? "1" : "0")).join(""),
    2
  );
  return gamma * epsilon;
}

function part2(input: Array<string>) {
  const oxygen = parseInt(recursiveFilter(input, 0, false), 2);
  const scrubber = parseInt(recursiveFilter(input, 0, true), 2);

  return oxygen * scrubber;
}

function recursiveFilter(
  array: string[],
  index: number,
  inverse: boolean
): string {
  const bitCount = array.reduce<number>((bitCount, value) => {
    if (value[index] === "1") {
      ++bitCount;
    }
    return bitCount;
  }, 0);

  const filteredArray = array.filter(
    (a) => a[index] === getFilterBit(bitCount, array.length, inverse)
  );
  if (filteredArray.length === 1) {
    return filteredArray[0];
  }
  return recursiveFilter(filteredArray, ++index, inverse);
}

function getFilterBit(bitCount: number, arraySize: number, inverse: boolean) {
  if (bitCount === arraySize / 2) {
    return inverse ? "0" : "1";
  }
  if (inverse) {
    return bitCount < arraySize / 2 ? "1" : "0";
  }
  return bitCount > arraySize / 2 ? "1" : "0";
}

export { part1, part2 };
