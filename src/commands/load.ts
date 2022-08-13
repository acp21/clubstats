import { AdminCommand } from "./subcommand"
import { loadData } from "../dataload"
import { Loader } from "../loader";

const fs = require('fs');


export class Load extends AdminCommand {

    file: string
    

    constructor(name: string, file: string){
        super(name);
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
            if(cur.type === 'm.room.member'){
                await loader.loadMembershipEvent(cur);
            }
            else if(cur.type === 'm.room.message'){
                await loader.loadMessage(cur);
            }
        }
    }
}