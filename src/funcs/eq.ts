import { Func } from "./funcs";
import { FuncUsage } from "./funcs";
import { Predicate } from "../queries/predicate";

export class Eq extends Func{

    comparator: string | number
    predicate: string


    constructor(usage: FuncUsage, predicate: string, comparator: string | number){
        super(usage);
        this.predicate = predicate;
        this.comparator = comparator;
        this.definition = 'eq'
    }

    build(): string {
        return super.build()
    }

    protected override buildUnique(out: string): string {
        // this.body += this.definition;
        out += '(' + this.predicate + ', ' + this.comparator;
        return out;
    }
}