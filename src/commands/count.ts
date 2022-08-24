import { TrackableCommand } from "./subcommand"
import { Query } from "../queries/query";
import { Eq } from "../funcs/eq";
import { Func, FuncUsage } from "../funcs/funcs";
import { DgraphClient } from "dgraph-js";
import dgraph from "dgraph-js";
import { Predicate } from "../queries/predicate";
import { Has } from "../funcs/has";

export class Count extends TrackableCommand {
    // The trackable group to count
    // TODO: Convert this trackable string to an enum system
    trackable: string

    constructor(trackable: string, users?: Array<string>){
        super(users)
        this.cmdName = 'count';
        this.trackable = trackable;
        this.query = new Query(this.cmdName, new Has(FuncUsage.ROOT, this.trackable));
    }

    protected override async runUnique(): Promise<string> {
        let pred: Predicate = new Predicate(this.trackable, "count");
        this.query?.addPredicate(pred);
        this.query?.print();
        let res = await this.query?.run();
        let json = res.getJson()
        let totalCount: number = 0;
        
        // TODO: Find the proper type of this
        json.count.forEach((element: any) => {
            totalCount += element['count(messages)'];
        })
        let out = 'Total messages found for this set: ' + totalCount + '!';
        console.log(out);
        return out;
    }

} 