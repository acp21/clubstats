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

    public getBody(){
        return this.build();
    }

    public print(){
        console.log(this.body);
    }

    /**
     * @brief contructs function and returns body string
     * @returns string: body of function after construction
     */
    protected build(): string{
        let out: string = '';
        out = this.buildSharedStart(out);
        out = this.buildUnique(out);
        out = this.buildSharedEnd(out);
        return out;
    }

    private buildSharedStart(out: string): string{
        if(this.usage == FuncUsage.ROOT){
            out += FuncBase.ROOT_BASE;
        }
        out += this.definition;
        return out;
    }
    
    protected buildSharedEnd(out: string): string{
        out += ')';
        return out
    }

    // This is an "Abstract Function" that should be overriden in each child class
    protected buildUnique(out: string): string{
        console.log("This should always be overwritten");
        return out
    }
}