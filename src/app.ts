import dgraph, { DgraphClient, TxnContext } from "dgraph-js";
import { Connection } from "./connection";
import { loadData } from "./dataload";
import { load } from "@grpc/grpc-js";

async function main() {


    var conn: Connection = new Connection('localhost:9080');

    // Read data from passed json file
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