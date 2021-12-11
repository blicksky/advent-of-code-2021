const scoreByIllegalCharacter = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
]);

const scoreByIncompleteCharacter = new Map([
    ['(', 1],
    ['[', 2],
    ['{', 3],
    ['<', 4]
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

export function getCompletionScore(inputLines: string[]) {
    const scores = inputLines
        .map((inputLine) => {
            let currentLine = inputLine;
            let previousLine;

            do {
                previousLine = currentLine;
                currentLine = currentLine.replace(/\(\)|\[\]|{}|<>/, '')
            } while (currentLine !== previousLine);

            return currentLine;
        })
        .filter((line) => !/[)\]}>]/.test(line))
        .map((incompleteLine) => {
            // console.log(incompleteLine);
            return [...incompleteLine].reduceRight((score, character) => {
                return ( score * 5 ) + scoreByIncompleteCharacter.get(character)!; 
            }, 0);
        })
        .sort((a, b) => a - b);

    return scores[Math.floor(scores.length / 2)];
}