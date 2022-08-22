import { createServer, IncomingMessage, ServerResponse, Server } from "http";
import { program } from "./app";
import { Loader } from "./loader";
import { createCommandParser } from "./command_controller";

export function startServer(){
    const port = 5000;
    const host = 'localhost';
    let loader = new Loader();
    
    const requestListener = function (req: IncomingMessage, res: ServerResponse) {
        res.setHeader("Content-Type", "text/plain");
        // Set HTTP Code as 200 by default, only change if error occurs
        switch(req.url) {
            // Run a command on the server
            case "/command":
                res.writeHead(200);
                // Data storage string
                let command: string = '';

                // Extract data from request chunk by chunk
                req.on('data', chunk => {
                    command += chunk;
                });
                req.on('end', () => {
                    // Log data once all received
                    let com: string = JSON.parse(command).command;
                    let arr: Array<string> = com.split(' ');
                    // let run = com.stringify(command);
                    console.log(com)
                    let tuple: Readonly<string[]> = arr;
                    program.parse(tuple, {from: 'user'});
                })

                res.end("Hit command");
                break
            // Add a new node to the server
            case "/new":
                res.writeHead(200);
                // Data extraction code is duplicate above as synchronicity issues prevent making
                // into a seperate function
                let message: string = '';
                req.on('data', chunk => {
                    message += chunk;
                });
                req.on('end', () => {
                    // Log data once all received
                    console.log(JSON.parse(message));
                    loader.loadEventEntrypoint(JSON.parse(message));
                })

                res.end("Hit new");
                break
            default:
                res.writeHead(404);
                res.end("Resource not found");
        }
        // res.end("Built a server");
    }

    const server: Server = createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}