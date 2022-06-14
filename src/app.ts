import { Connection } from "./connection";
import { loadData } from "./dataload"
import { loadSchemas } from "./schema"

async function main() {

    
    var conn: Connection = new Connection('localhost:9080');
    console.log('Connection Established!');
    // Read data from passed json file
    // await loadData(conn)
    await loadSchemas(conn);

    conn.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });