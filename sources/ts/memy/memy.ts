import { Dictionary, Nullable } from "../utils";
import { MemyEntry } from "./memy.entry";
import { IMemy } from "./lib";
import { createMemyTriggersKey } from "./create.memy.triggers.key";

export class Memy implements IMemy {
    private _entries: Dictionary<MemyEntry> = {};
    private _isOverrideEntriesAllow: boolean = false;

    public setOverrideEntriesRule(rule: boolean): Memy {
        this._isOverrideEntriesAllow = Boolean(rule);
        return this;
    }

    public addEntry(triggers: any[], values: any[]): Memy {
        if (!this._isOverrideEntriesAllow && this.getEntry(triggers)) {
            return this;
        }

        const entry: MemyEntry = new MemyEntry(triggers, values);
        this._entries[entry.triggersKey] = entry;
        return this;
    }

    public removeEntry(triggers: any[]): Memy {
        if (!this.getEntry(triggers)) {
            return this;
        }

        const triggersKey: string = createMemyTriggersKey(triggers);

        delete this._entries[triggersKey];

        return this;
    }

    public getEntry(triggers: any[]): Nullable<MemyEntry> {
        const triggersKey: string = createMemyTriggersKey(triggers);
        return this._entries.hasOwnProperty(triggersKey)
            ? this._entries[triggersKey]
            : null;
    }
}