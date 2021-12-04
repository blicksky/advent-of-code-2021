import { resolve } from 'path';
import { readInput } from "../../src/index";
import { getPowerConsumption } from "../../src/day03";

const PART_1_EXAMPLE_RESULT = 198;
const PART_1_INPUT_RESULT = 2648450;

const PART_2_EXAMPLE_RESULT = 230;
const PART_2_INPUT_RESULT = 2845944;

describe('day02', () => {

  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(resolve(__dirname, `../../src/day03/example.txt`));
    input = await readInput(resolve(__dirname, `../../src/day03/input.txt`));
  });

  test("part 1 example", async () => {
    expect(getPowerConsumption(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(getPowerConsumption(input)).toEqual(PART_1_INPUT_RESULT);
  });

  // test("part 2 example", async () => {
  //   expect(calculateAimedPositionProduct(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  // });

  // test("part 2 input", async () => {
  //   expect(calculateAimedPositionProduct(input)).toEqual(PART_2_INPUT_RESULT);
  // });

});