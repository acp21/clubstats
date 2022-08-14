import { CalculableCommand } from "./subcommand"


export class Count extends CalculableCommand {
    constructor(){
        super()
        this.cmdName = 'count';
    }

} 