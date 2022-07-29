// Enum of all functions provided by dgraph, does not include geolocation funcs
enum FuncType {
    ALLOFTERMS,
    ANYOFTERMS,
    REGEXP,
    MATCH,
    ALLOFTEXT,
    EQ,
    LE,
    LT,
    GE,
    GT,
    BETWEEN,
    UID,
    UID_IN,
    HAS,   
}

enum FuncBase {
    ROOT_BASE = 'func: ',
    FILTER_BASE = '@filter('
}

// Define if func is to be used as root or as filter
export enum FuncUsage {
    ROOT,
    FILTER
}

// Abstract class to act as a parent for all other func classes
export abstract class Func {

    // TODO: Set a method to autodefine this
    type: FuncType | null = null;
    usage: FuncUsage;
    body: string = '';
    definition: string = ''

    constructor(usage: FuncUsage){
        this.usage = usage;
    }

    getBody(){
        return this.body;
    }

    // Build up to function arguments
    build(){
        switch(this.usage){
            case FuncUsage.ROOT:
                this.body += FuncBase.ROOT_BASE;
                break;
            case FuncUsage.FILTER:
                this.body += FuncBase.FILTER_BASE;
                break;
            default:
                console.log("Error: Non expected FuncUsage");
                return
        }
        this.body += this.definition;
        // this.build()
    }
}