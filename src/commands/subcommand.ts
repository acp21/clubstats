import { Func, FuncUsage } from "../funcs/funcs";
import { Eq } from "../funcs/eq";
import { Has } from "../funcs/has";
import { stringToUsername } from "../useful";
import { Query } from "../queries/query";


export abstract class Subcommand {

    cmdName: string = '';


    public run(): void{
        console.log("This is an abstract subcommand")
    }
}

export abstract class TrackableCommand extends Subcommand {
    // Specifies to run on all available data
    everything: boolean;
    users: Array<string> | undefined;
    rooms: Array<string> | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    

    constructor(users?: Array<string>, rooms?: Array<string>, start_date?: string, end_date?: string, everything = false){
        super();
        this.users = users
        this.rooms = rooms
        this.start_date = start_date
        this.end_date = end_date
        this.everything = everything
    }

    public run(): void { 
        let query: Query = this.runUniqueStart();
        query = this.runShared(query);
        this.runUniqueEnd(query);
    }

    protected runUniqueStart(): Query {
        console.log("this should be overriden");
        let query: Query = new Query("", new Has(FuncUsage.ROOT,""));
        return query;
    }

    protected runUniqueEnd(query: Query): Query {
        return query;
    }

    private runShared(query: Query): Query {
        // let filters: Array<Func> = []
        let func: Eq;
        this.users?.forEach((user) =>{
            func = new Eq(FuncUsage.FILTER, "username", stringToUsername(user));
            query.root_filters.push(func);
        });
        return query
    }

}

export abstract class AdminCommand extends Subcommand {
    public run(): void{
        // TODO: Implement safety checking here
        super.run()
        console.log("Ensuring that we verify user doing AdminCommand")
    }
}

