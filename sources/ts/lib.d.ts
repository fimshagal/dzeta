import {Dictionary, Nullable} from "./utils";

export interface ZetaSequenceFraction {
    numerator: number;
    denominator: number;
    power: number;
}

export interface GetZetaSequenceDataOptions {
    numerator?: number;
    plainSequenceResponse?: boolean;
}

export type ZetaSequenceElement = ZetaSequenceFraction | number;

export type El$ = Dictionary<Nullable<HTMLElement>>;