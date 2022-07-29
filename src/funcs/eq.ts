import { Func } from "./funcs";
import { FuncUsage } from "./funcs";
import { Predicate } from "../queries/predicate";
export class eq extends Func{

    comparator: string | number
    predicate: Predicate


    constructor(usage: FuncUsage, predicate: Predicate, comparator: string | number){
        super(usage);
        this.predicate = predicate;
        this.comparator = comparator;
        this.definition = 'eq:'
    }

    build(): void {
        super.build()
        
    }
}