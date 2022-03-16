import dgraph, { DgraphClient, DgraphClientStub } from "dgraph-js";

class Connection {
    client!: DgraphClient;
    stub!: DgraphClientStub;


    construtor(endpoint: string){
        this.stub = new DgraphClientStub(endpoint);
        this.client = new DgraphClient(this.stub);
    }
}


export function connectToServer(endpoint : string){
    var clientStub = new dgraph.DgraphClientStub(endpoint);
    return new dgraph.DgraphClient(clientStub);
}

export async function addMessage(message : string, txn: dgraph.Txn, mu : dgraph.Mutation){
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

export async function addUser(user : string, txn: dgraph.Txn, mu: dgraph.Mutation){

}

export async function runQuery(txn: dgraph.Txn, query: string, vars?: object){
    
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

export async function runMutation(txn: dgraph.Txn, mu: dgraph.Mutation, update: object){

}