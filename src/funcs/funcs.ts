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
    // Body of the function to be built upon
    body: string = '';
    // Defining word of function (has, eq, etc...)
    definition: string = ''

    constructor(usage: FuncUsage){
        this.usage = usage;
    }

    getBody(){
        return this.body;
    }

    print(){
        console.log(this.body);
    }

    // Build up to function arguments
    build(){
        this.buildSharedStart();
        this.buildUnique();
        this.buildSharedEnd();
    }

    private buildSharedStart(){
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
    private buildSharedEnd(){
        this.body += ')';
    }

    // This is an "Abstract Function" that should be overriden in each child class
    buildUnique(){
        console.log("This should always be overwritten");
    }
}