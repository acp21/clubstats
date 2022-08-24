import express, { Request, Response, NextFunction } from 'express';

import { program } from './app';
import { ret_string } from './command_controller';

export function buildExpresss(){
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.get('/command', async (req: Request, res: Response) => {
        console.log(req.body);
        let command: string = req.body['command'];
        let arr: Array<string> = command.split(' ');
        let tuple: Readonly<string[]> = arr;

        await program.parseAsync(tuple, {from: 'user', res: res})
        res.send(ret_string);
    })

    app.post('/new', (req: Request, res: Response) => {
        console.log(req.body);
        
    })

    app.listen(port, () => {
        console.log(`Express server running on port ${port}`);
    })

    
}