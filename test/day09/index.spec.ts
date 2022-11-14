import { resolve } from "path";
import { readInput } from "../../src/index";
import { getRisk } from "../../src/day09";

const PART_1_EXAMPLE_RESULT = 15;
const PART_1_INPUT_RESULT = 491;

// const PART_2_EXAMPLE_RESULT = 288957;
// const PART_2_INPUT_RESULT = 3122628974;

describe("day09", () => {
  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(
      resolve(__dirname, `../../src/day09/example.txt`)
    );
    input = await readInput(resolve(__dirname, `../../src/day09/input.txt`));
  });

  test("part 1 example", async () => {
    expect(getRisk(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(getRisk(input)).toEqual(PART_1_INPUT_RESULT);
  });

  test("part 2 example", async () => {
    // expect(getCompletionScore(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  });

  test("part 2 input", async () => {
    // expect(getCompletionScore(input)).toEqual(PART_2_INPUT_RESULT);
  });
});
