import { Connection } from "./connection";
import { loadData } from "./dataload"
import { loadSchemas } from "./schema"
import { Configuration } from "./config"


import { createCommandParser } from "./command_controller"
import { startServer } from "./server";
import { Command } from "commander";

// Global program variable that is used to parse command throughout server
export const program: Command = createCommandParser();
export const config: Configuration = new Configuration();

async function main() {

    let conn: Connection;
    console.log(config);
    if(config.has_remote){
        console.log("attempting to connect to the server")
        conn = new Connection('localhost:9080');
        await loadSchemas(conn);
    }
    
    if(process.argv.length < 3){
        startServer();
    }
    else{
        program.parse();
    }


    // Create connection to Dgraph server
    // var conn: Connection = new Connection('localhost:9080');
    // load appropriate schema definitions into server
    // await loadSchemas(conn);

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