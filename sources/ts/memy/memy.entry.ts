import { IMemyEntry } from "./lib";
import {createMemyTriggersKey} from "./create.memy.triggers.key";

export class MemyEntry implements IMemyEntry{
    private readonly _triggers: any[] = [];
    private readonly _values: any[] = [];

    constructor(triggers: any[], values: any[]) {
        this._triggers = [...triggers];
        this._values = [...values];
    }

    public get triggersKey(): string {
        return createMemyTriggersKey(this._triggers);
    }

    public get values(): any[] {
        return this._values;
    }
}