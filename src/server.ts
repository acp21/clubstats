import { createServer, IncomingMessage, ServerResponse, Server } from "http";


export function startServer(){
    const port = 5000;
    const host = 'localhost';


    const requestListener = function (req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200);
        res.end("Built a server");
    }

    const server: Server = createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}