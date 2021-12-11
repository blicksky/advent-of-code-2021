const scoreByIllegalCharacter = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
]);

export function findErrors(inputLines: string[]) {
    return inputLines.reduce((score, inputLine) => {
        let currentLine = inputLine;
        let previousLine;

        do {
            previousLine = currentLine;
            currentLine = currentLine.replace(/\((?:(--)*)\)|\[((?:--)*)\]|{((?:--)*)}|<((?:--)*)>/, '-$1$2$3$4-')
        } while (currentLine !== previousLine);

        const [ illegalCharacter ] = currentLine.match(/[)\]}>]/) || [];

        return score + ( scoreByIllegalCharacter.get(illegalCharacter) ?? 0 );
    }, 0);
}
