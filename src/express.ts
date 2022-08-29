import express, { Request, Response, NextFunction } from 'express';

import { Loader } from './loader';
import { program } from './app';
import { config } from './app';
import { ret_string } from './command_controller';

export function buildExpresss(){
    const app = express();
    const port = config.port;
    let loader: Loader = new Loader();

    app.use(express.json());

    app.get('/command', async (req: Request, res: Response) => {
        console.log(req.body);
        let command: string = req.body['command'];
        let arr: Array<string> = command.split(' ');
        let tuple: Readonly<string[]> = arr;

        try{
            await program.parseAsync(tuple, {from: 'user'});
        }
        catch(err){
            console.log(err);
        }
        res.send(ret_string);
    })

    app.post('/new', (req: Request, res: Response) => {
        console.log(req.body);
        res.send("Hit new");
        loader.loadEventEntrypoint(req.body);
        
    })

    app.listen(port, () => {
        console.log(`Express server running on port ${port}`);
    })

    
}