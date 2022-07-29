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
        .option("-u, --user", "Limit to one or more users | [user1,user2,user3] for multiple users.")
        .option("-r, --room", "Limit query to a certain room")
        .option("-s, --start", "Time stamp of start of search, if no -e flag passed, go to current time")
        .option("-e, --end", "Timestamp of end time, if no -s passed, start from Unix Epoch.")
        .version("0.0.1");

    // TODO: Change this to check @ and # for user and member
    // TODO: Add more boolean arguments to control what info to print
    program.command("info")
        .description("Print out general info about a user or a room")
        .option("-m, --member", "Run command on a user")
        .option("-c, --channel", "Run command on a room")
        .option("-w, --word", "Get info on a single word instead")
        .argument("<item>", "Item to print info about")
        .action((item) => {
            console.log("info");
        })
    
    program.command("extremes")
        .description("Find user with most/least of any calculable")
        .argument("<calculable>", "Calculable to find min/max of")
        .option("-t, --top", "Find user with maximum of any calculable")
        .option("-b, --bottom", "Find user with minimum of any calculable")
        .action((calculable) => {
            console.log("Extremes");
        });
    
    program.command("average")
        .description("Calculate the average of some calculable per time period")
        .argument("<calculable>", "Calculable to average")
        .action((calculable) => {
            console.log("averaging calculable")
        });
    
    program.command("count")
        .description("Count the total amount of some item.")
        .argument("<calculable>", "Define item to count.")
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
            let load = new Load("load", file);
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
