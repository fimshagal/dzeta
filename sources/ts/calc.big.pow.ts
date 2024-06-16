import Big from "big.js";

export const calcBigPow = (base: number, power: number): Big.Big => {
    let response: Big.Big = new Big(1);
    for (let i = 0; i < power; i++) {
        response = response.times(base);
    }
    return response;
};