import { AdminCommand } from "./subcommand"
import { loadData } from "../dataload"

export class Load extends AdminCommand {

    file: string

    constructor(name: string, file: string){
        super(name);
        this.file = file;
    }

    public async run(): Promise<void>{
        super.run()
        // TODO: Update load data to take file and use new query system
       await loadData(this.file)
    }
}