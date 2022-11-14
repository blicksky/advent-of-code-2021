const example = `CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const ruleMap = example
  .split("\n")
  .map((line) => line.split(" -> "))
  .reduce(
    (ruleMap, [key, value]) => ruleMap.set(key, value),
    new Map<string, string>()
  );

const step = (chars: string[]): string[] =>
  chars.reduceRight(([first, ...rest], char) => [
    char,
    ruleMap.get(char + first)!,
    first,
    ...rest,
  ]); // why doesn't this return a string[]?

let polymer = [..."NNCB"];
for (let i = 0; i < 10; ++i) {
  polymer = step(polymer);
}
polymer;
