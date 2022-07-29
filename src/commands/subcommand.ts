export abstract class Subcommand {

    public run(): void{
        console.log("This is an abstract subcommand")
    }
}

export class AdminCommand extends Subcommand {
    public run(): void{
        // TODO: Implement safety checking here
        super.run()
        console.log("Ensuring that we verify user doing AdminCommand")
    }
}

