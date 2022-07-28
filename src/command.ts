import { Command, program } from "commander";
import * as readline from "readline";


export function testCommander(){
    const proram = new Command();
    console.log ("running test commander");

    program
        .name("test")
        .description("testing commander library")
        .version("0.0.1");

    program.command("hello")
        .description("a test command for the test command")
        .argument("<nothing>", "this doesnt do anything")
        .option("--world", "this doesnt do anything either")
        .action((str, options) => {
            console.log("Callback function for this command");
        });
    
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // var name: string;
    rl.question('Who are you?', (name: any) => {
        let argv: Array<string> = name.split(" ");
        argv.unshift('1', '2');
        console.log(argv);
        program.parse(argv);
        const options = program.opts();
        console.log(options);
        rl.close();
    });

}

export function createCommandParser(): Command{
    const program: Command = new Command();

    // Create base CLI program
    program
        .name("clubstats")
        .description("A CLI tool to read interface with the cclub dgraph db")
        .usage("<subcommand> [options]")
        .version("0.0.1");
    
    // TODO: Ensure these debug commands have access restriction
    program.command("debug")
        .description("A suite of debug and admin tools for the clubstats server")
        .argument("<subcommand>", "The subcommand to run")
        .action((subcommand) => {
            console.log(`running debug subcommand ${subcommand}`);
        });

    program.command("load")
        .description("Load Matrix data from a provided JSON file")
        .argument("<file>", "File path to the JSON file to read from")
        .action((file) => {
            console.log("Loading from file %s", file);
        });

    program.command("connect")
        .description("Connect to a dgraph database")
        .argument("<endpoint>", "Endpoint URL for the dgraph server")
        .action((endpoint) => {
            console.log("Creating connection for database at %s", endpoint);
        });
    
    return program
}
