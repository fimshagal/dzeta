import { ZetaSequenceFraction, ZetaSequenceElement, ZetaStore } from "./lib";
import { isNumber, Nullable } from "./utils";
import { getZetaSequenceData } from "./get.zeta.sequence.data";
import { sumZetaSequence } from "./sum.zeta.sequence";
import { calcZetaFraction } from "./calc.fraction";
import Big from "big.js";
import { Memy, MemyEntry } from "./memy";

const zetaStore: ZetaStore = {
    maxSequenceLength: 500,
    initPower: 2,
    initLength: 5,
    currentPower: 0,
    currentLength: 0,
    el$: {},
    el$Names: ['inputPower', 'outputSequence', 'outputSum', 'inputLength', 'buttonExe'],
    memy: new Memy(),
};

const defineEl$ = (): void => {
    for (const name of zetaStore.el$Names) {
        zetaStore.el$[name] = document.getElementById(name);
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
        inputPower.value = `${zetaStore.currentPower}`;
        return;
    }

    zetaStore.currentPower = parsedValue;
};

const handleOnBlurInputPower = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;
    inputPower.value = `${zetaStore.currentPower}`;
};

const handleOnChangeInputLength = (event: Event): void => {
    const inputLength: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputLength.value;

    if (!value.trim()) {
        return;
    }

    let parsedValue: number = Number(value);

    if (isNaN(parsedValue)) {
        inputLength.value = `${zetaStore.currentLength}`;
        return;
    }

    const isValueReachedLimit: boolean = parsedValue > zetaStore.maxSequenceLength;

    zetaStore.currentLength = isValueReachedLimit ? zetaStore.maxSequenceLength : parsedValue;

    if (isValueReachedLimit) {
        inputLength.value = `${zetaStore.currentLength}`;
    }
};

const handleOnBlurInputLength = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;
    inputPower.value = `${zetaStore.currentLength}`;
};

const handleOnClickButtonExe = (event: Event): void => {
    event.preventDefault();
    handleZeta(zetaStore.currentPower, zetaStore.currentLength);
};

const handleZeta = (zeta: number, length: number): void => {
    if (isNaN(zeta)) return;

    const sequence: ZetaSequenceElement[] = getZetaSequenceData(zeta, length);
    const memyEntry: Nullable<MemyEntry> | undefined = zetaStore.memy.getEntry([zeta, length]);
    const sum: Big.Big = memyEntry
        ? new Big(Number(memyEntry.values[0]))
        : sumZetaSequence(sequence);

    outputSequence(sequence);
    outputSum(sum);

    if (!memyEntry) {
        zetaStore.memy.addEntry([zeta, length], [sum.toString()]);
    }
};

const setupInputPower = (): void => {
    const inputPower: Nullable<HTMLInputElement> = zetaStore.el$.inputPower as Nullable<HTMLInputElement>;
    inputPower!.value = `${zetaStore.currentPower}`;
    inputPower?.addEventListener("input", handleOnChangeInputPower);
    inputPower?.addEventListener("blur", handleOnBlurInputPower);
};

const setupInputLength = (): void => {
    const inputLength: Nullable<HTMLInputElement> = zetaStore.el$.inputLength as Nullable<HTMLInputElement>;
    inputLength!.value = `${zetaStore.currentLength}`;
    inputLength?.addEventListener("input", handleOnChangeInputLength);
    inputLength?.addEventListener("blur", handleOnBlurInputLength);
};

const setupInputs = (): void => {
    setupInputPower();
    setupInputLength();
};

const setupButtonExe = (): void => {
    const buttonExe: Nullable<HTMLButtonElement> = zetaStore.el$.buttonExe as Nullable<HTMLButtonElement>;
    buttonExe?.addEventListener('click', handleOnClickButtonExe);
};

const setupButtons = (): void => {
    setupButtonExe();
};

const setCurrentValuesByDefault = (): void => {
    zetaStore.currentPower = zetaStore.initPower;
    zetaStore.currentLength = zetaStore.initLength;
};

const outputSum = (value: Big.Big): void => {
    zetaStore.el$.outputSum!.innerText = `Sum: ${value.toString()}`;
};

const outputSequence = (sequence: ZetaSequenceElement[]): void => {
    const outputSequence: Nullable<HTMLOutputElement> = zetaStore.el$.outputSequence as Nullable<HTMLOutputElement>;

    outputSequence!.innerHTML = `<span>ζ(${zetaStore.currentPower})</span> => `;

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
    handleZeta(zetaStore.currentPower, zetaStore.currentLength);
};