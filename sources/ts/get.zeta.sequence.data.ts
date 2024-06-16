import { GetZetaSequenceDataOptions, ZetaSequenceElement, ZetaSequenceFraction } from "./lib";
import { calcZetaFraction } from "./calc.fraction";
import {isNumber} from "./utils";

const zetaSequenceDefaultFraction: ZetaSequenceFraction = {
    numerator: 1,
    denominator: 1,
    power: 1,
};

const defaultSequenceLength: number = 5;

export const getZetaSequenceData = (power: number, sequenceLength?: number, options?: GetZetaSequenceDataOptions): ZetaSequenceElement[] => {
    const response: ZetaSequenceElement[] = [1];

    if (!power) {
        throw Error('"getZetaSequenceData" the function won\'t work without zeta value');
    }

    if (!sequenceLength) {
        console.warn(`Sequence length is undefined. Used default length ${defaultSequenceLength}`);
        sequenceLength = defaultSequenceLength;
    }

    const numerator: number = options?.numerator || zetaSequenceDefaultFraction.numerator;
    const plainSequenceResponse: boolean = options?.plainSequenceResponse || false;

    for (let i: number = 0; i < sequenceLength - 1; i++) {
        const denominator: number = i + 2;
        response.push({ numerator, denominator, power });
    }

    if (plainSequenceResponse) {
        return response.map((sequenceElement: ZetaSequenceElement): number => {
            return isNumber(sequenceElement)
                ? sequenceElement as number
                : calcZetaFraction(sequenceElement as ZetaSequenceFraction)
        });
    }

    return response;
};