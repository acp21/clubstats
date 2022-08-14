import { AdminCommand } from "./subcommand"
import { Loader } from "../loader";

const fs = require('fs');


export class Load extends AdminCommand {

    file: string
    

    constructor(file: string){
        super();
        this.cmdName = 'load';
        this.file = file;
    }

    public async run(): Promise<void>{
        super.run()
        // TODO: Update load data to take file and use new query system
        let rawdata = fs.readFileSync(this.file);
        let data = JSON.parse(rawdata);
        let messages = data.messages
        let cur;
        let loader = new Loader();
        for (let i in messages){
            cur = messages[i];
            await loader.loadEventEntrypoint(cur);
        }
    }
}