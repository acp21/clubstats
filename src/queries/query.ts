import { Txn } from "dgraph-js";
import { Predicate } from "./predicate";
import { Func } from "../funcs/funcs";
import { conn } from "../app";

// Consant strings to build queries out of

const QUERY_TEMPLATE = `{
NAME(func: FUNC(PREDICATE, COMPARISON)){
    RETURNS
    }
}`

const QUERY_START = '{';
const QUERY_END = '}';

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


    vars: JSON | null
    // Transaction object from dgraph client
    // txn: Txn
    private body: string
    
    name: string;
    predicates: Array<Predicate> = []
    root_func: Func;
    root_filters: Array<Func> = [];


    constructor(name: string, root_func: Func, vars = null){
        this.name = name;
        this.body = QUERY_START;
        this.root_func = root_func;
        this.vars = vars;
    }


    private buildQuery(){
        let out: string = '';
        out += QUERY_START;
        out += this.name + '(';
        out += this.root_func.getBody() + ')';
        // Using length because empty arrays are truthy in JS
        if(this.root_filters.length){
            // TODO: Get rid of magic numbers
            out += '@filter('

        }
        this.root_filters.forEach((filter, i) => {
            out += filter.getBody();
            if(i != this.root_filters.length - 1){
                out += ' AND ';
            }
            
        });
        out += ')';
        out += '{';
        //Include predicates below
        this.predicates.forEach((pred) => {
            out += pred.build() + '\n';
        })
        out += '}}';
        return out;
    }

    async run(){
        let txn: Txn = conn.client.newTxn()
        this.buildQuery();
        return await conn.runQuery(this.body)
    }

    // Return raw body of query
    getBody(){
        return this.buildQuery();
    }
    print(){
        console.log(this.getBody());
    }

    // Add a predicate to this query
    addPredicate(predicate: Predicate){
        this.predicates.push(predicate);
    }

    addDirective(directive: Func){
        this.root_filters.push(directive);
    }

}