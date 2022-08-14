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

    build(): void {
        super.build()        
    }

    override buildUnique(): void {
        // this.body += this.definition;
        this.body += '(' + this.predicate + ', ' + this.comparator
    }
}