const testInput = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
];

const openCloseTagMapping: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const characterPoints: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const completingPoints: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function part1(input: Array<string>) {
  return input
    .reduce<string[]>((wrongs, line) => {
      const stack: string[] = [];
      for (let char of line.split("")) {
        if (stack[0] === char) {
          stack.shift();
        } else if (openCloseTagMapping[char]) {
          stack.unshift(openCloseTagMapping[char]);
        } else {
          wrongs.push(char);
          break;
        }
      }
      return wrongs;
    }, [])
    .reduce((a, b) => a + characterPoints[b], 0);
}

function part2(input: Array<string>) {
  const scores = input
    .map((line) => {
      const stack: string[] = [];
      for (let char of line.split("")) {
        if (stack[0] === char) {
          stack.shift();
        } else if (openCloseTagMapping[char]) {
          stack.unshift(openCloseTagMapping[char]);
        } else {
          return [];
        }
      }
      return stack;
    }, [])
    .filter((characters) => characters.length !== 0)
    .map((characters) =>
      characters.reduce((score, char) => {
        score = score * 5;
        score += completingPoints[char];
        return score;
      }, 0)
    )
    .sort((a, b) => b - a);
  return scores[(scores.length - 1) / 2];
}

export { part1, part2 };
