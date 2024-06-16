import { ZetaSequenceElement, ZetaSequenceFraction } from "./lib";
import { calcZetaFraction } from "./calc.fraction";
import { isNumber } from "./utils";

export const sumZetaSequence = (sequence: ZetaSequenceElement[]): number => {
    if (!sequence || !sequence.length) {
        throw Error("Sequence either is empty or absent");
    }

    return sequence.reduce((sum: number, currentValue: ZetaSequenceElement): number => {
        currentValue = isNumber(currentValue)
            ? currentValue as number
            : calcZetaFraction(currentValue as ZetaSequenceFraction);

        return sum + currentValue;
    }, 0);
};