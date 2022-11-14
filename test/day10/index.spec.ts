import { resolve } from "path";
import { readInput } from "../../src/index";
import { findErrors, getCompletionScore } from "../../src/day10";

const PART_1_EXAMPLE_RESULT = 26397;
const PART_1_INPUT_RESULT = 411471;

const PART_2_EXAMPLE_RESULT = 288957;
const PART_2_INPUT_RESULT = 3122628974;

describe("day01", () => {
  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(
      resolve(__dirname, `../../src/day10/example.txt`)
    );
    input = await readInput(resolve(__dirname, `../../src/day10/input.txt`));
  });

  test("part 1 example", async () => {
    expect(findErrors(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(findErrors(input)).toEqual(PART_1_INPUT_RESULT);
  });

  test("part 2 example", async () => {
    expect(getCompletionScore(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  });

  test("part 2 input", async () => {
    expect(getCompletionScore(input)).toEqual(PART_2_INPUT_RESULT);
  });
});
