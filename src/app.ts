import dgraph, { DgraphClient, TxnContext } from "dgraph-js";
import * as data from "./export.json";
import { Connection } from "./connection";
import { loadData } from "./dataload";
import { load } from "@grpc/grpc-js";

async function main() {


    var conn: Connection = new Connection('localhost:9080');

    await loadData(conn)

    conn.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });