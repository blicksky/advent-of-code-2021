import { STATEMENT_OR_BLOCK_KEYS } from '@babel/types';
import { example } from './example'

const [template, ruleLines] = example.split('\n\n');
const rules = new Map(
    ruleLines
        .split('\n')
        .map((ruleLine) => {
            const [match, insertion] = ruleLine.split(' -> ');
            return [match, insertion];
        })
);

type Element = {
    readonly left: string
    readonly right: string
}

type Start = {
    readonly left: '^'
    readonly righr: Element['right']
}

template.