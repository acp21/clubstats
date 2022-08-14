export abstract class Subcommand {

    cmdName: string = '';


    public run(): void{
        console.log("This is an abstract subcommand")
    }
}

export abstract class CalculableCommand extends Subcommand {
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

}

export abstract class AdminCommand extends Subcommand {
    public run(): void{
        // TODO: Implement safety checking here
        super.run()
        console.log("Ensuring that we verify user doing AdminCommand")
    }
}

