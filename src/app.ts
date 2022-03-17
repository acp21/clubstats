import dgraph, { DgraphClient, TxnContext } from "dgraph-js";
import * as data from "./export.json";
import { Connection } from "./connection";

async function main() {


    var conn: Connection = new Connection('localhost:9080');
    const p = {
        body: "This is the message"
    };
    
    // const txn = dgraphClient.newTxn()
    // const mu = new dgraph.Mutation();
    
    // addMessage(data.messages[0], txn, mu);

    // Run query.
const query = `{
    node(func: has(name))
    {
      name
    }
}`;

    const vars = { $a: "Alice" };
    // runQuery(txn, query)
    // Actually run transaction
    // const res = await runQuery(txn,query, vars);
    // (console.log(JSON.stringify(res.getJson())))
    // console.log(JSON.stringify(res.getJson()))

    conn.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });