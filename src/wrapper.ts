import dgraph from "dgraph-js";

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

export async function addUser(user : any, txn: dgraph.Txn, mu: any){

}

export async function runQuery(txn: dgraph.Txn, query: string, vars?: any){
    
    // Result of query
    var res: dgraph.Response

    // Check if vars have been passed
    if(vars){
        res = await txn.queryWithVars(query, vars)
    }
    else{
        res =  await txn.query(query)
    }
    return res
}