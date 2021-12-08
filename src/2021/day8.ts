const testInput = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];

function part1(input: Array<string>) {
  return input
    .map((v) => v.split(" | ")[1].split(" "))
    .flat()
    .filter((v) => [2, 3, 4, 7].includes(v.length)).length;
}

const uniqueSegmentCounts: Record<number, string> = {
  2: "1",
  3: "7",
  4: "4",
  7: "8",
};

function part2(input: Array<string>) {
  const lines = input.map((v) =>
    v
      .split(" | ")[0]
      .split(" ")
      .map((v) => v.split("").sort().join(""))
  );

  const uniqueDigits = lines.map((line) =>
    line
      .filter((v) => [2, 3, 4, 7].includes(v.length))
      .reduce<Record<string, string>>((acc, value) => {
        acc[uniqueSegmentCounts[value.length]] = value;
        acc[value] = uniqueSegmentCounts[value.length];
        return acc;
      }, {})
  );

  const sizeFives = lines.map((line) => line.filter((v) => v.length === 5));

  const sizeFiveDigits = sizeFives.map((sizeFive, index) =>
    sizeFive.reduce<Record<string, string>>((acc, value) => {
      if (uniqueDigits[index]["1"].split("").every((c) => value.includes(c))) {
        acc["3"] = value;
        acc[value] = "3";
      } else if (
        uniqueDigits[index]["4"].split("").filter((c) => !value.includes(c))
          .length === 1
      ) {
        acc["5"] = value;
        acc[value] = "5";
      } else {
        acc["2"] = value;
        acc[value] = "2";
      }
      return acc;
    }, {})
  );

  const sizeSixs = lines.map((line) => line.filter((v) => v.length === 6));

  const sizeSixDigits = sizeSixs.map((sizeSix, index) =>
    sizeSix.reduce<Record<string, string>>((acc, value) => {
      if (uniqueDigits[index]["4"].split("").every((c) => value.includes(c))) {
        acc["9"] = value;
        acc[value] = "9";
      } else if (
        uniqueDigits[index]["7"].split("").every((c) => value.includes(c))
      ) {
        acc["0"] = value;
        acc[value] = "0";
      } else {
        acc["6"] = value;
        acc[value] = "6";
      }
      return acc;
    }, {})
  );

  const translations = lines.map((_i, index) => ({
    ...uniqueDigits[index],
    ...sizeFiveDigits[index],
    ...sizeSixDigits[index],
  }));

  return input
    .map((line, index) =>
      parseInt(
        line
          .split(" | ")[1]
          .split(" ")
          .map((v) => v.split("").sort().join(""))
          .map((v) => translations[index][v])
          .join("")
      )
    )
    .reduce((a, b) => a + b, 0);
}

export { part1, part2 };
