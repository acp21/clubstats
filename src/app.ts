import { Connection } from "./connection";
import { loadData } from "./dataload"
import { loadSchemas } from "./schema"

import { testCommander } from "./command"

async function main() {

    testCommander();

    // Create connection to Dgraph server
    // var conn: Connection = new Connection('localhost:9080');
    // load appropriate schema definitions into server
    // await loadSchemas(conn);

    console.log('Connection Established!');
    // Read data from passed json file
    // await loadData(conn)

    // Close the connection when work is finished
    // conn.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });