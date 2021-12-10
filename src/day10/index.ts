/* Part 1 (incomplete) */
let line = '{([(<{}[<>[]}>{[]{[(<()>';
let previousLine;

do {
    console.log({line, previousLine});
    previousLine = line;
    line = line.replace(/\((?:(--)*)\)|\[((?:--)*)\]|{((?:--)*)}|<((?:--)*)>/, '-$1$2$3$4-')
} while (line !== previousLine);

/[([{<](?!-*[([{<])/.exec('{([(<--[----}>{--{[(----')
