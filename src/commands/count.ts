import { CalculableCommand } from "./subcommand"
import { Query } from "../queries/query";
import { Eq } from "../funcs/eq";
import { FuncUsage } from "../funcs/funcs";
import { DgraphClient } from "dgraph-js";
import dgraph from "dgraph-js";

export class Count extends CalculableCommand {
    constructor(){
        super()
        this.cmdName = 'count';
    }

    public async run(): Promise<void> {
        let func: Eq = new Eq(FuncUsage.ROOT, "userName", "alu");
        let query: Query = new Query("count", func);
        console.log("QUERY BODY: " + query.getBody())
        let res: dgraph.Response = await query.run();
        console.log(res.getJson())
        // console.log(res);

    }

} 