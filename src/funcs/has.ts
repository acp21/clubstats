import { Func } from "./funcs";
import { FuncUsage } from "./funcs";

export class Has extends Func{
    FUNC_CALL: string = 'has';
    // The predicate to look for
    predicate: string;

    constructor(usage: FuncUsage, predicate: string){
        super(usage);
        this.predicate = predicate;
    }

    override buildUnique(): void {
        this.body += this.FUNC_CALL + '(';
        this.body += this.predicate;
    }
}