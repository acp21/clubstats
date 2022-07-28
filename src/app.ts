import { Connection } from "./connection";
import { loadData } from "./dataload"
import { loadSchemas } from "./schema"

import { testCommander, createCommandParser } from "./command"
import { startServer } from "./server";
import { Command } from "commander";


async function main() {

    let program: Command = createCommandParser();
    // program.parse();

    startServer();


    // Create connection to Dgraph server
    // var conn: Connection = new Connection('localhost:9080');
    // load appropriate schema definitions into server
    // await loadSchemas(conn);

    console.log('Connection Established!');
    // Read data from passed json file
    // await loadData(conn)

    // Close the connection when work is finished
    // conn.close();
    // while(1){}
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });