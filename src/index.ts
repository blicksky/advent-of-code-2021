import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function readInput(inputPath: string) {
    const input = await readFile(inputPath, "utf8");

    return input
        .trim()
        .split(/[\r\n]+/);
}

export async function run() {
    const [, day, functionName, inputFileName] = process.argv;
    const dayDirName = `day${day.padStart(2, '0')}`;
    const dayModule = await import(resolve(`src/${dayDirName}`));
    const inputLines = await readInput(resolve(`src/${dayDirName}/${inputFileName}.txt`));
    const result = dayModule[functionName](inputLines);
    console.log(result);
}
