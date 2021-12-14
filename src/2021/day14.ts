const testInput = [
  "NNCB",
  "",
  "CH -> B",
  "HH -> N",
  "CB -> H",
  "NH -> C",
  "HB -> C",
  "HC -> B",
  "HN -> C",
  "NN -> C",
  "BH -> H",
  "NC -> B",
  "NB -> B",
  "BN -> B",
  "BB -> N",
  "BC -> B",
  "CC -> N",
  "CN -> C",
];

function parseRules(inputs: string[]) {
  return new Map<string, string>(
    inputs.map((input) => input.split(" -> ") as [string, string])
  );
}

function part1(input: Array<string>) {
  let polymer = input[0];
  const rules = parseRules(input.slice(2, input.length));

  for (let x = 0; x < 10; ++x) {
    let newPolymer = "";
    for (let i = 0; i < polymer.length - 1; i++) {
      const rule = rules.get(polymer[i] + polymer[i + 1]);
      newPolymer += polymer[i];
      if (rule) {
        newPolymer += rule;
      }
    }
    newPolymer += polymer[polymer.length - 1];
    polymer = newPolymer;
  }

  const letterCounts = polymer
    .split("")
    .reduce<Record<string, number>>((counts, letter) => {
      counts[letter] ? ++counts[letter] : (counts[letter] = 1);
      return counts;
    }, {});

  const minMax = Object.values(letterCounts).reduce<number[]>(
    (maxMin, value) => {
      if (!maxMin[0] || maxMin[0] < value) {
        maxMin[0] = value;
      }
      if (!maxMin[1] || maxMin[1] > value) {
        maxMin[1] = value;
      }
      return maxMin;
    },
    []
  );

  return minMax[0] - minMax[1];
}

function part2(input: Array<string>) {
  const polymer = input[0];
  const lastLetter = polymer[polymer.length - 1];
  const rules = parseRules(input.slice(2, input.length));
  let rulesCount: Record<string, number> = {};

  for (let i = 0; i < polymer.length - 1; i++) {
    const rule = polymer[i] + polymer[i + 1];
    if (rules.has(rule)) {
      rulesCount[rule] ? ++rulesCount[rule] : (rulesCount[rule] = 1);
    }
  }

  for (let x = 0; x < 40; ++x) {
    const newRuleCount: Record<string, number> = {};
    Object.keys(rulesCount).forEach((rule) => {
      const newChar = rules.get(rule);
      const [char1, char2] = rule.split("");
      if (rules.has(char1 + newChar)) {
        newRuleCount[char1 + newChar]
          ? (newRuleCount[char1 + newChar] += rulesCount[rule])
          : (newRuleCount[char1 + newChar] = rulesCount[rule]);
      }
      if (rules.has(newChar + char2)) {
        newRuleCount[newChar + char2]
          ? (newRuleCount[newChar + char2] += rulesCount[rule])
          : (newRuleCount[newChar + char2] = rulesCount[rule]);
      }
    });
    rulesCount = newRuleCount;
  }

  const letterCounts = Object.keys(rulesCount).reduce<Record<string, number>>(
    (counts, rule) => {
      const [letter1, letter2] = rule.split("");
      counts[letter1]
        ? (counts[letter1] += rulesCount[rule])
        : (counts[letter1] = rulesCount[rule]);
      return counts;
    },
    { [lastLetter]: 1 }
  );

  const minMax = Object.values(letterCounts).reduce<number[]>(
    (maxMin, value) => {
      if (!maxMin[0] || maxMin[0] < value) {
        maxMin[0] = value;
      }
      if (!maxMin[1] || maxMin[1] > value) {
        maxMin[1] = value;
      }
      return maxMin;
    },
    []
  );

  return minMax[0] - minMax[1];
}

export { part1, part2 };
