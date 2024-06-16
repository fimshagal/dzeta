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
    el$: {
        inputPower: document.getElementById('inputPower'),
        outputSequence: document.getElementById('outputSequence'),
        outputSum: document.getElementById('outputSum'),
        inputLength: document.getElementById('inputLength'),
        buttonExe: document.getElementById('buttonExe'),
    },
    memy: new Memy(),
};

const handleOnChangeInputPower = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (!value.trim()) {
        return;
    }

    const parsedValue: number = Number(value);

    if (isNaN(parsedValue)) {
        setInputValue(inputPower, zetaStore.currentPower);
        return;
    }

    const isValueOutOfReal: boolean = parsedValue <= 0;

    zetaStore.currentPower = isValueOutOfReal ? 1 : parsedValue;

    if (isValueOutOfReal) {
        setInputValue(inputPower, zetaStore.currentPower);
    }
};

const handleOnBlurInputPower = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;

    setInputValue(inputPower, zetaStore.currentPower);
};

const handleOnChangeInputLength = (event: Event): void => {
    const inputLength: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputLength.value;

    if (!value.trim()) {
        return;
    }

    let parsedValue: number = Number(value);

    if (isNaN(parsedValue)) {
        setInputValue(inputLength, zetaStore.currentLength);
        return;
    }

    const isValueReachedLimit: boolean = parsedValue > zetaStore.maxSequenceLength;

    zetaStore.currentLength = isValueReachedLimit ? zetaStore.maxSequenceLength : parsedValue;

    if (isValueReachedLimit) {
        setInputValue(inputLength, zetaStore.currentLength);
    }
};

const handleOnBlurInputLength = (event: Event): void => {
    const inputPower: HTMLInputElement = event.target as HTMLInputElement;

    const value: string = inputPower.value;

    if (value.trim()) return;

    setInputValue(inputPower, zetaStore.currentLength);
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

const setupInput = (el: HTMLInputElement, initValue: number, handlerOnInput: (event: Event) => void, handlerOnBlur: (event: Event) => void ): void => {
    setInputValue(el, initValue);
    el.addEventListener("input", handlerOnInput);
    el.addEventListener("blur", handlerOnBlur);
};

const setInputValue = (el: HTMLInputElement, value: number): void => {
    el.value = `${value}`;
};

const setupInputs = (): void => {
    setupInput(
        zetaStore.el$.inputPower as HTMLInputElement,
        zetaStore.currentPower,
        handleOnChangeInputPower,
        handleOnBlurInputPower,
    );
    setupInput(
        zetaStore.el$.inputLength as HTMLInputElement,
        zetaStore.currentLength,
        handleOnChangeInputLength,
        handleOnBlurInputLength,
    );
};

const setupButton = (el: HTMLButtonElement, handlerOnClick: (event: Event) => void): void => {
    el.addEventListener('click', handlerOnClick);
};

const setupButtons = (): void => {
    setupButton(
        zetaStore.el$.buttonExe as HTMLButtonElement,
        handleOnClickButtonExe,
    );
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

    outputSequence!.innerHTML = getOutputSequenceHtml(zetaStore.currentPower);

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

const getOutputSequenceHtml = (value: number): string => `<span class="title title-output-sequence">ζ(${value}) ⇒ </span>`;

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
    setCurrentValuesByDefault();
    setupInputs();
    setupButtons();
    handleZeta(zetaStore.currentPower, zetaStore.currentLength);
};