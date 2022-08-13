import dgraph, { DgraphClient, DgraphClientStub, Mutation, Txn } from "dgraph-js";

export class Connection {
    client: DgraphClient;
    stub: DgraphClientStub;

        // Shared types

        // This nodeType denotes the type of NODE, not subtype of node
        // Every node has a nodeType value to define if it is a user node, membership node, etc
        // nodeType: string

        // Variables for user node

        // nodeType: string
        // joinDate: date
        // username: string
        // event: rel
        // aliase: rel
        // message: rel

        // Variables for message node

        // nodeType: string
        // messageBody: string
        // eventID: string
        // eventDate: date
        
        // Variables for membership node

        // nodeType: string
        // membership: string
        // eventDate: date
        // eventID: string

    constructor(endpoint: string){
        this.stub = new DgraphClientStub(endpoint);
        this.client = new DgraphClient(this.stub);
    }

    connectToServer(endpoint : string){
        var clientStub = new dgraph.DgraphClientStub(endpoint);
        return new dgraph.DgraphClient(clientStub);
    }
    
    async findUser(username: string): Promise<dgraph.Response>{
        console.log("Looking for user" + username);
        const q = `query all($u: string){
            user(func: eq(username, $u)){
                uid
                username
            }
        }`
        const vars = {$u: username};
        return await this.runQuery(q, vars);
    }

    async findMessage(message: string){
        const q = `query all($m: string){
            message(func: eq(eventID, $m)){
                eventID
            }
        }`
        const vars = {$m: message};
        return await this.runQuery(q, vars)
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
            await txn.mutate(mu)
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

    async updateSchema(schema: string){
        const op = new dgraph.Operation();
        op.setSchema(schema);
        await this.client.alter(op);
    }

    // Queries Below
    async userTotalDays(username: string){
        const vars = {$u: username};
        const q = `query all($u: string){
            user(func: eq(username, $u)){
                uid
                username
                joined
            }
        }`;

        var result = await this.runQuery(q, vars);
        var joined = new Date(result.getJson().user[0].joined);
        var now = new Date(Date.now());
        var diff = (now.getTime() - joined.getTime()) / (1000 * 3600 * 24);
        return diff;
    }

    async userTotalMessages(username: string){
        const vars = {$u: username};
        const q = `query all($u: string){
            user(func: eq(username, $u)){
                username
                count(messages)
            }
        }`;

        var result = await this.runQuery(q, vars);
        return result.getJson().user[0]['count(messages)'];
    }

    async userMPD(username: string){
        return await this.userTotalMessages(username) / await this.userTotalDays(username);
    }
}