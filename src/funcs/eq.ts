import { Func } from "./funcs";
import { FuncUsage } from "./funcs";

/**
 * @brief Function to check for equality.
 */
export class Eq extends Func{

    comparator: string | number
    predicate: string

    /**
     * @param usage FuncUsage : defines if function is to be used as a root or a filter
     * @param predicate string : predicate to check for equality with
     * @param comparator string | number : value to check predicate against
     */
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