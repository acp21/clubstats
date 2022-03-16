import dgraph, { DgraphClient, DgraphClientStub, Mutation } from "dgraph-js";

export class Connection {
    client: DgraphClient;
    stub: DgraphClientStub;


    constructor(endpoint: string){
        this.stub = new DgraphClientStub(endpoint);
        this.client = new DgraphClient(this.stub);
    }

    connectToServer(endpoint : string){
        var clientStub = new dgraph.DgraphClientStub(endpoint);
        return new dgraph.DgraphClient(clientStub);
    }
    
    async addMessage(message: object){
        const txn = this.client.newTxn()
        const mu = new Mutation();
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
    
    async addUser(user : string, txn: dgraph.Txn, mu: dgraph.Mutation){
    
    }
    
    async runQuery(txn: dgraph.Txn, query: string, vars?: object){
        
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
    
    async runMutation(txn: dgraph.Txn, mu: dgraph.Mutation, update: object){
    
    }

    close(){
        this.stub.close();
    }

}


