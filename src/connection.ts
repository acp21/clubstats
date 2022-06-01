import dgraph, { DgraphClient, DgraphClientStub, Mutation, Txn } from "dgraph-js";

export class Connection {
    client: DgraphClient;
    stub: DgraphClientStub;

        // Variables for user node

        // type: string
        // joined: date
        // username: string
        // events: rel
        // aliases: rel
        // messages: rel

        // Variables for message node

        // type: string
        // body: string
        // eventID: string
        // sendDate: date
        // sender: rel
        
        // Variables for event node

        // type: string
        // membership: string
        // eventDate: date 

    constructor(endpoint: string){
        this.stub = new DgraphClientStub(endpoint);
        this.client = new DgraphClient(this.stub);
    }

    connectToServer(endpoint : string){
        var clientStub = new dgraph.DgraphClientStub(endpoint);
        return new dgraph.DgraphClient(clientStub);
    }
    
    async findUser(username: string){
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