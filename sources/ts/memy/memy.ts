import { Dictionary, Nullable } from "../utils";
import { MemyEntry } from "./memy.entry";
import { IMemy } from "./lib";
import { createMemyTriggersKey } from "./create.memy.triggers.key";

export class Memy implements IMemy {
    private _entries: Dictionary<MemyEntry> = {};
    private _isOverrideEntriesAllow: boolean = false;

    private _isStarted: boolean = false;

    private logOnStart(): void {
        if (this._isStarted) {
            return;
        }
        this._isStarted = true;
        console.log("[Memy]: use only json-friendly values for triggers and values");
    }

    public setOverrideEntriesRule(rule: boolean): Memy {
        this.logOnStart();

        this._isOverrideEntriesAllow = Boolean(rule);

        return this;
    }

    public addEntry(triggers: any[], values: any[]): Memy {
        this.logOnStart();

        if (!this._isOverrideEntriesAllow && this.getEntry(triggers)) {
            return this;
        }

        const entry: MemyEntry = new MemyEntry(triggers, values);
        this._entries[entry.triggersKey] = entry;

        return this;
    }

    public removeEntry(triggers: any[]): Memy {
        this.logOnStart();

        if (!this.getEntry(triggers)) {
            return this;
        }

        const triggersKey: string = createMemyTriggersKey(triggers);

        delete this._entries[triggersKey];

        return this;
    }

    public getEntry(triggers: any[]): Nullable<MemyEntry> {
        this.logOnStart();

        const triggersKey: string = createMemyTriggersKey(triggers);

        return this._entries.hasOwnProperty(triggersKey)
            ? this._entries[triggersKey]
            : null;
    }
}