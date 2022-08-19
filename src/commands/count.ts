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

    constructor(trackable: string){
        super()
        this.cmdName = 'count';
        this.trackable = trackable;
        this.query = new Query(this.cmdName, new Has(FuncUsage.ROOT, this.trackable));
    }

    // public async run(): Promise<void> {
    //     let func: Eq = new Eq(FuncUsage.ROOT, "userName", "$USER");
    //     let query: Query = new Query("count", func);
    //     let pred: Predicate = new Predicate("messages", "count");
    //     let filter: Has = new Has(FuncUsage.FILTER, "username");
    //     let filter2: Has = new Has(FuncUsage.FILTER, "something");
    //     query.addPredicate(pred);
    //     query.addDirective(filter);
    //     query.addDirective(filter2);
    //     console.log("QUERY BODY: " + query.getBody())
    //     // let res: dgraph.Response = await query.run();
    //     // console.log(res.getJson())
    //     // console.log(res);

    // }

    protected override async runUnique() {
        let pred: Predicate = new Predicate("messages", "count");
        this.query?.addPredicate(pred);
        this.query?.print();
           
    }

} 