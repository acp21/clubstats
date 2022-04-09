import { Connection } from "./connection";

async function main() {


    var conn: Connection = new Connection('localhost:9080');

    // Read data from passed json file
    // await loadData(conn)

    conn.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });