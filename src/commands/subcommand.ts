import { Func, FuncUsage } from "../funcs/funcs";
import { Eq } from "../funcs/eq";
import { Has } from "../funcs/has";
import { stringToUsername } from "../useful";
import { Query } from "../queries/query";
import { config } from "../app";


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
    query: Query | undefined;

    constructor(users?: Array<string>, rooms?: Array<string>, start_date?: string, end_date?: string, everything = false){
        super();
        this.users = users
        this.rooms = rooms
        this.start_date = start_date
        this.end_date = end_date
        this.everything = everything
    }

    public run(): void {
        this.runShared()
        this.runUnique()
    }

    protected runUnique() {
        console.log("this should be overriden");
    }

    private runShared() {
        // let filters: Array<Func> = []
        let func: Eq;
        this.users?.forEach((user) =>{
            func = new Eq(FuncUsage.FILTER, "username", stringToUsername(user));
            this.query?.root_filters.push(func);
        });
    }

}

export abstract class AdminCommand extends Subcommand {
    public run(): void{
        // TODO: Implement safety checking here
        if(!config.allow_debug){
            return
        }
        else{
            super.run()
            console.log("Ensuring that we verify user doing AdminCommand")
        }
    }
}

