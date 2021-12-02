import { forOfStatement } from '@babel/types';
import { readFile } from 'fs/promises';

export async function readInput(inputPath: string) {
    const input = await readFile(inputPath, "utf8");

    return input
        .trim()
        .split(/\s+/);
}

export async function run() {
    const [, day, functionName, inputFileName] = process.argv;

    const dayModule = await import(`${process.cwd()}\\src\\${day}\\${day}`);
    const inputLines = await readInput(`${process.cwd()}\\src\\${day}\\${inputFileName}`);
    const result = dayModule[functionName](inputLines);
    console.log(result);
}
