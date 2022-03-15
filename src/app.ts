import dgraph from "dgraph-js";
import * as data from "./export.json";
import {connectToServer} from "./wrapper";
import { addMessage } from "./wrapper";


// Must be run to create a new client stub which is then used to create a dgraph client
function newClientStub() {
    // Using port 9080 becuase we are using grpc
    return new dgraph.DgraphClientStub("localhost:9080");
}

// Create client from client stub
function newClient(clientStub: any) {
    return new dgraph.DgraphClient(clientStub);
}

async function createData(dgraphClient: any) {
    const txn = dgraphClient.newTxn();
    try {
        const p = {
            uid: "_:alice",
            name: "Alice",
            age: 26,
            married: true,
            loc: {
                type: "Point",
                coordinates: [1.1, 2],
            },
            dob: new Date(1980, 1, 1, 23, 0, 0, 0),
            friend: [
                {
                    name: "Bob",
                    age: 24,
                },
                {
                    name: "Charlie",
                    age: 29,
                },
                
            ],
            school: [
                {
                    name: "a school"
                }
            ]
        };

        const mu = new dgraph.Mutation();
        mu.setSetJson(p);
        const response = await txn.mutate(mu);

        await txn.commit();
        console.log("Commited Transaction");
    } finally {
        await txn.discard();
    }
}

async function main() {
    // Create clientStub
    const dgraphClientStub = newClientStub();
    // Create client from clientStub
    const dgraphClient = newClient(dgraphClientStub);

    const txn = dgraphClient.newTxn()
    const mu = new dgraph.Mutation();
    addMessage(data.messages[0], txn, mu);

    // Actually run transaction
    await createData(dgraphClient);
    // Close connection to the server
    dgraphClientStub.close();
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });