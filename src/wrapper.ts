const dgraph = require("dgraph-js");

export function connectToServer(endpoint : string){
    var clientStub = new dgraph.DgraphClientStub(endpoint);
    return new dgraph.DgraphClient(clientStub);
}

export async function addMessage(message : any, txn: any, mu : any){
    try{
        mu.setSetJson(message);
        const response = await txn.mutate(mu);
        await txn.commit();
        console.log("Added message");
    }
    finally{
        await txn.discard();
    }
}