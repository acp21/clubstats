import { createServer, IncomingMessage, ServerResponse, Server } from "http";
import { program } from "./app";


export function startServer(){
    const port = 5000;
    const host = 'localhost';

    

    const requestListener = function (req: IncomingMessage, res: ServerResponse) {
        res.setHeader("Content-Type", "text/plain");
        // Set HTTP Code as 200 by default, only change if error occurs
        switch(req.url) {
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
                    console.log(JSON.parse(command));
                })

                res.end("Hit command");
                break
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