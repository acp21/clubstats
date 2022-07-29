import { Txn } from "dgraph-js";

const QUERY_START = 'query ';

export class Query {
    
    vars: JSON | undefined
    body: string
    // Transaction object from dgraph client
    txn: Txn

    constructor(txn: Txn, vars?: JSON){
        this.txn = txn;
        this.body = QUERY_START
        this.vars = vars;
    }


}