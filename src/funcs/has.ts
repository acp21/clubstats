import { Func } from "./funcs";
import { FuncUsage } from "./funcs";

export class Has extends Func{
    // The predicate to look for
    predicate: string;

    constructor(usage: FuncUsage, predicate: string){
        super(usage);
        this.predicate = predicate;
        this.definition = 'has';
    }

    protected override buildUnique(out: string): string {
        out += '(' + this.predicate;
        return out;
    }
}