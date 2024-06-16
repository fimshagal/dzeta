import {Nullable} from "../utils";
import {MemyEntry} from "./memy.entry";
import {Memy} from "./memy";

export interface IMemy {
    setOverrideEntriesRule(rule: boolean): Memy;
    addEntry(triggers: any[], values: any[]): Memy;
    getEntry(triggers: any[]): Nullable<MemyEntry>;
    removeEntry(triggers: any[]): Memy;
}

export interface IMemyEntry {

}

export interface MemyAddingEntryOptions {
    override?: boolean;
}