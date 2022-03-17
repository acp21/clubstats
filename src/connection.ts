import dgraph, { DgraphClient, DgraphClientStub, Mutation, Txn } from "dgraph-js";

export class Connection {
    client: DgraphClient;
    stub: DgraphClientStub;


        // Variables for user node
        // type: string
        // joined: date
        // id: string
        // message: rel
        // events: rel
        // aliases: rel

    constructor(endpoint: string){
        this.stub = new DgraphClientStub(endpoint);
        this.client = new DgraphClient(this.stub);
    }

    connectToServer(endpoint : string){
        var clientStub = new dgraph.DgraphClientStub(endpoint);
        return new dgraph.DgraphClient(clientStub);
    }
    
    async runQuery(query: string, vars?: object){
        
        // Result of query
        var res: dgraph.Response
        const txn = this.client.newTxn()
        // Check if vars have been passed
        if(vars){
            res = await txn.queryWithVars(query, vars)
        }
        else{
            res =  await txn.query(query)
        }
        return res
    }
    
    async runMutation(update: object){
        const txn = this.client.newTxn();
        try{
            const mu = new Mutation;
            mu.setSetJson(update);
            await txn.commit()
            console.log("Committed Transaction")
        }
        finally{
            await txn.discard()
        }
    }

    close(){
        this.stub.close();
    }

}


