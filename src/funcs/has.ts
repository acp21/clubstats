import { Func } from "./funcs";
import { FuncUsage } from "./funcs";

class Has extends Func{
    predicate: string

    constructor(usage: FuncUsage, predicate: string){
        super(usage);
        this.predicate = predicate;
    }
}