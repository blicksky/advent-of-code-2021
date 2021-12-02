import { readInput } from "../../src/index";
import { calculatePositionProduct, calculateAimedPositionProduct } from "../../src/day02/day02";

const PART_1_EXAMPLE_RESULT = 150;
const PART_1_INPUT_RESULT = 1714950;

const PART_2_EXAMPLE_RESULT = 900;
const PART_2_INPUT_RESULT = 1281977850;

describe('day02', () => {

  let exampleInput: string[];
  let input: string[];

  beforeAll(async () => {
    exampleInput = await readInput(`./src/day02/example.txt`);
    input = await readInput("./src/day02/input.txt");
  });

  test("part 1 example", async () => {
    expect(calculatePositionProduct(exampleInput)).toEqual(PART_1_EXAMPLE_RESULT);
  });

  test("part 1 input", async () => {
    expect(calculatePositionProduct(input)).toEqual(PART_1_INPUT_RESULT);
  });

  test("part 2 example", async () => {
    expect(calculateAimedPositionProduct(exampleInput)).toEqual(PART_2_EXAMPLE_RESULT);
  });

  test("part 2 input", async () => {
    expect(calculateAimedPositionProduct(input)).toEqual(PART_2_INPUT_RESULT);
  });

});