import { resolve } from 'path';
import { readInput } from "../../src/index";
import { findErrors } from "../../src/day10";

const PART_1_EXAMPLE_RESULT = 26397;
const PART_1_INPUT_RESULT = 411471;

// const PART_2_EXAMPLE_RESULT = ;
// const PART_2_INPUT_RESULT = ;

describe('day01', () => {

  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(resolve(__dirname, `../../src/day10/example.txt`));
    input = await readInput(resolve(__dirname, `../../src/day10/input.txt`));
  });

  test("part 1 example", async () => {
    expect(findErrors(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(findErrors(input)).toEqual(PART_1_INPUT_RESULT);
  });

  test("part 2 example", async () => {
    // expect(countSlidingWindowIncreases(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  });

  test("part 2 input", async () => {
    // expect(countSlidingWindowIncreases(input)).toEqual(PART_2_INPUT_RESULT);
  });

});