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

// Define if func is to be used as root or as filter
export enum FuncUsage {
    ROOT,
    FILTER
}

// Abstract class to act as a parent for all other func classes
export abstract class Func {

    // TODO: Set a method to autodefine this
    type: FuncType | undefined;
    usage: FuncUsage;
    body: string = '';

    constructor(usage: FuncUsage){
        this.usage = usage;
    }
}