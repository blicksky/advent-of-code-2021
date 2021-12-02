import { readInput } from "../../src/index";
import { countIncreases, countSlidingWindowIncreases } from "../../src/day01/day01";

const PART_1_EXAMPLE_RESULT = 7;
const PART_1_INPUT_RESULT = 1521;

const PART_2_EXAMPLE_RESULT = 5;
const PART_2_INPUT_RESULT = 1543;

describe('day01', () => {

  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(`./src/day01/example.txt`);
    input = await readInput("./src/day01/input.txt");
  });

  test("part 1 example", async () => {
    expect(countIncreases(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(countIncreases(input)).toEqual(PART_1_INPUT_RESULT);
  });

  test("part 2 example", async () => {
    expect(countSlidingWindowIncreases(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  });

  test("part 2 input", async () => {
    expect(countSlidingWindowIncreases(input)).toEqual(PART_2_INPUT_RESULT);
  });

});