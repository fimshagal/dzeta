import { ZetaSequenceFraction } from "./lib";

export const calcZetaFraction = (fraction: ZetaSequenceFraction): number => fraction.numerator / Math.pow(fraction.denominator, fraction.power);