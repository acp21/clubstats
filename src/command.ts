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
        let argv = name.split(" ");
        console.log(argv);
        program.parse(argv);
        rl.close();
    });

}
