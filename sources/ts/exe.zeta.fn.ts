import {El$, ZetaSequenceFraction} from "./lib";
import {isNumber, Nullable} from "./utils";
import { ZetaSequenceElement } from "./lib";
import { getZetaSequenceData } from "./get.zeta.sequence.data";
import {sumZetaSequence} from "./sum.zeta.sequence";
import {calcZetaFraction} from "./calc.fraction";
import Big from "big.js";

const maxSequenceLength: number = 500;
const initPower: number = 2;
const initLength: number = 5;
const el$: El$ = {};
const el$Names: string[] = ['inputPower', 'outputSequence', 'outputSum', 'inputLength', 'buttonExe'];
let currentPower: number = 0;
let currentLength: number = 0;

const defineEl$ = (): void => {
    for (const name of el$Names) {
        el$[name] = document.getElementById(name);
    }
};

const handleOnChangeInputPower = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (!value.trim()) {
        return;
    }

    const parsedValue: number = Number(value);

    if (isNaN(parsedValue)) {
        inputPower.value = `${currentPower}`;
        return;
    }

    currentPower = parsedValue;
};

const handleOnBlurInputPower = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;
    inputPower.value = `${currentPower}`;
};

const handleOnChangeInputLength = (event: Event): void => {
    const inputLength: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputLength.value;

    if (!value.trim()) {
        return;
    }

    let parsedValue: number = Number(value);

    if (isNaN(parsedValue)) {
        inputLength.value = `${currentLength}`;
        return;
    }

    const isValueReachedLimit: boolean = parsedValue > maxSequenceLength;

    currentLength = isValueReachedLimit ? maxSequenceLength : parsedValue;

    if (isValueReachedLimit) {
        inputLength.value = `${currentLength}`;
    }
};

const handleOnBlurInputLength = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;
    inputPower.value = `${currentLength}`;
};

const handleOnClickButtonExe = (event: Event): void => {
    event.preventDefault();
    handleZeta(currentPower, currentLength);
};

const handleZeta = (zeta: number, length: number): void => {
    if (isNaN(zeta)) return;

    const sequence: ZetaSequenceElement[] = getZetaSequenceData(zeta, length);
    outputSequence(sequence);
    outputSum(sumZetaSequence(sequence));
};

const setupInputPower = (): void => {
    const inputPower: Nullable<HTMLInputElement> = el$.inputPower as Nullable<HTMLInputElement>;
    inputPower!.value = `${currentPower}`;
    inputPower?.addEventListener("input", handleOnChangeInputPower);
    inputPower?.addEventListener("blur", handleOnBlurInputPower);
};

const setupInputLength = (): void => {
    const inputLength: Nullable<HTMLInputElement> = el$.inputLength as Nullable<HTMLInputElement>;
    inputLength!.value = `${currentLength}`;
    inputLength?.addEventListener("input", handleOnChangeInputLength);
    inputLength?.addEventListener("blur", handleOnBlurInputLength);
};

const setupInputs = (): void => {
    setupInputPower();
    setupInputLength();
};

const setupButtonExe = (): void => {
    const buttonExe: Nullable<HTMLButtonElement> = el$.buttonExe as Nullable<HTMLButtonElement>;
    buttonExe?.addEventListener('click', handleOnClickButtonExe);
};

const setupButtons = (): void => {
    setupButtonExe();
};

const setCurrentValuesByDefault = (): void => {
    currentPower = initPower;
    currentLength = initLength;
};

const outputSum = (value: Big.Big): void => {
    el$.outputSum!.innerText = `Sum: ${value.toString()}`;
};

const outputSequence = (sequence: ZetaSequenceElement[]): void => {
    const outputSequence: Nullable<HTMLOutputElement> = el$.outputSequence as Nullable<HTMLOutputElement>;

    outputSequence!.innerHTML = `<span>ζ(${currentPower})</span> => `;

    let html: string = '';
    let iterationCounter: number = 0;

    for (const sequenceElement of sequence) {
        html = isNumber(sequenceElement)
            ? getSequenceNumberHtml(sequenceElement)
            : getSequenceFractionHtml(sequenceElement as ZetaSequenceFraction);

        outputSequence!.innerHTML += `${(iterationCounter === 0 ? '' : " + ")}${html} `;
        iterationCounter++;
    }
    outputSequence!.innerHTML += '+ ...';
};

const getSequenceNumberHtml = (value: ZetaSequenceElement): string => `<span class="sequence-number">${value}</span>`;

const getSequenceFractionHtml = (fraction: ZetaSequenceFraction): string => {
    const { numerator, denominator, power } = fraction;

    return `<span class="sequence-fraction" title="${calcZetaFraction(fraction).toString()}">
        <span class="numerator-group"><span class="numerator-symbol">${numerator}</span></span>
        <span class="denominator-group">
            <span class="denominator-symbol">${denominator}</span>
            <span class="power-symbol">${power}</span>
        </span>
    </span>`;
};

export const exeZetaFn = (): void => {
    defineEl$();
    setCurrentValuesByDefault();
    setupInputs();
    setupButtons();
    handleZeta(currentPower, currentLength);
};