import { TrackableCommand } from "./subcommand"
import { Query } from "../queries/query";
import { Eq } from "../funcs/eq";
import { FuncUsage } from "../funcs/funcs";
import { DgraphClient } from "dgraph-js";
import dgraph from "dgraph-js";
import { Predicate } from "../queries/predicate";

export class Count extends TrackableCommand {
    constructor(){
        super()
        this.cmdName = 'count';
    }

    public async run(): Promise<void> {
        let func: Eq = new Eq(FuncUsage.ROOT, "userName", "$USER");
        let query: Query = new Query("count", func);
        let pred: Predicate = new Predicate("messages", "count");
        query.addPredicate(pred);
        console.log("QUERY BODY: " + query.getBody())
        // let res: dgraph.Response = await query.run();
        // console.log(res.getJson())
        // console.log(res);

    }

} 