import { Txn } from "dgraph-js";

// Consant strings to build queries out of

const QUERY_TEMPLATE = `{
NAME(func: FUNC(PREDICATE, COMPARISON)){
    RETURNS
    }
}`

const QUERY_START = '{query(';

const FUNC_START = 'func: '
const FUNC_ALLOFTERMS = 'allofterms(';
const FUNC_ANYOFTERMS = 'anyofterms(';
const FUNC_EQ = 'eq(';

enum Fnc {
    ALLOFTERMS = 'allofterms(',
    ANYOFTERMS = 'anyofterms(',
    EQ = 'eq(',
};

export class Query {
    
    // Each query has the following
    // Name
    // Root Function
    // Return Predicates

    // Each Return Predicate can have the following
    // Filters
    // IsEdge, has own Predicates


    vars: JSON | undefined
    // Transaction object from dgraph client
    txn: Txn
    private body: string
    
    private fnc: Fnc | undefined
    private predicate: string | undefined

    constructor(txn: Txn, vars?: JSON){
        this.txn = txn;
        this.body = QUERY_START;
        this.vars = vars;
    }

    addFunction(fnc: Fnc){
        this.fnc = fnc;
    }

    buildQuery(){
        this.body += QUERY_START;
        if(typeof this.fnc != 'undefined'){
            this.body += FUNC_START + this.fnc + this.predicate
        }
    }

}