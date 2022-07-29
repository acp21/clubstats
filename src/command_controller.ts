import { Command } from "commander";
import { config } from "./app";
import { Load } from "./commands/load"

export function createCommandParser(): Command{
    const program: Command = new Command();

    // Create base CLI program
    program
        .name("clubstats")
        .description("A CLI tool to read interface with the cclub dgraph db")
        .usage("<subcommand> [options]")
        .option("-u, --user", "Limit query to single user")
        .version("0.0.1");
    
    program.command("count")
        .description("Count the total amount of some item.")
        .argument("<countable>", "Define item to count.")
        .action((countable) => {
            console.log(`counting countable ${countable}`);
        });
    
    // TODO: Ensure these debug commands have access restriction
    program.command("debug")
        .description("A suite of debug and admin tools for the clubstats server")
        .argument("<subcommand>", "The subcommand to run")
        .action((subcommand) => {
            console.log(`running debug subcommand ${subcommand}`);
        });

    // TODO: Change this to actually update the config.json file
    program.command("config")
        .description("Set config variables for the server")
        .argument("<setting>", "Setting to change")
        .argument("<value>", "Value to change setting to")
        .action((setting, value) => {
            switch(setting){
                case 'endpoint':
                    config.setEndpoint(value);
                    break;
                default:
                    console.log("Invalid setting passed");
            }
        });
    
    program.command("load")
        .description("Load Matrix data from a provided JSON file")
        .argument("<file>", "File path to the JSON file to read from")
        .action((file) => {
            console.log("Loading from file %s", file);
            let load = new Load();
            load.run()
        });

    program.command("connect")
        .description("Connect to a dgraph database")
        .argument("<endpoint>", "Endpoint URL for the dgraph server")
        .action((endpoint) => {
            console.log("Creating connection for database at %s", endpoint);
        });
    
    return program
}
