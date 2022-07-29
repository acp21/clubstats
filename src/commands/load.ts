import { AdminCommand } from "./subcommand"
import { loadData } from "../dataload"

export class Load extends AdminCommand {

    public run(): void{
        super.run()
        loadData()
    }
}