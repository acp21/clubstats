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

    override buildUnique(): void {
        this.body += '(' + this.predicate;
    }
}