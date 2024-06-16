import { ZetaSequenceElement, ZetaSequenceFraction } from "./lib";
import { calcZetaFraction } from "./calc.fraction";
import { isNumber } from "./utils";
import Big from "big.js";

export const sumZetaSequence = (sequence: ZetaSequenceElement[]): Big.Big => {
    if (!sequence || !sequence.length) {
        throw Error("Sequence either is empty or absent");
    }

    let response: Big.Big = new Big(0);

    for (const sequenceItem of sequence) {
        const handledValue: number | Big.Big = isNumber(sequenceItem)
            ? new Big(sequenceItem as number)
            : calcZetaFraction(sequenceItem as ZetaSequenceFraction);

        response = response.add(handledValue);
    }

    return response;
};