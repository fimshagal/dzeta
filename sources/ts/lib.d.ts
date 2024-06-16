import { Dictionary, Nullable } from "./utils";
import { Memy } from "./memy";

export interface ZetaSequenceFraction {
    numerator: number;
    denominator: number;
    power: number;
}

export interface GetZetaSequenceDataOptions {
    numerator?: number;
    plainSequenceResponse?: boolean;
}

export interface ZetaStore {
    maxSequenceLength: number;
    initPower: number;
    initLength: number;
    currentPower: number;
    currentLength: number;
    el$: El$;
    memy: Memy;
}

export type ZetaSequenceElement = ZetaSequenceFraction | number;

export type El$ = Dictionary<Nullable<HTMLElement>>;