import { ZetaSequenceFraction } from "./lib";
import Big from 'big.js';
import { calcBigPow } from "./calc.big.pow";

export const calcZetaFraction = (fraction: ZetaSequenceFraction): Big.Big => {
    const numerator: Big.Big = new Big(fraction.numerator);
    const poweredValue: Big.Big = calcBigPow(fraction.denominator, fraction.power);

    return numerator.div(poweredValue);
};