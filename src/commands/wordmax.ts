/*
{wordmax(func: has(messages)){
  username
  count(messages@filter(anyofterms(messageBody, "club")))
}}
*/
import { conn } from "../app";
import { TrackableCommand } from "./subcommand";

export class WordMax extends TrackableCommand{
    
    // TODO: Convert this command to use the new API instead of direct queries

    body: string = `query wordmax($w: string)
        {wordmax(func: has(messages)){
            username
            count(messages@filter(anyofterms(messageBody, $w)))
        }}`;
    word: string;

    constructor(word: string){
        super();
        this.cmdName = "wordmax";
        this.word = word;
    }

    protected override async runUnique(): Promise<string> {
        let out: string = '';

        let res = await conn.runQuery(this.body, { $w: this.word});
        let json = res.getJson();
        let max: number = 0;
        let user: string = '';
        json.wordmax.forEach((element: any) => {
            if(element['count(messages)'] > max){
                user = element['username'];
                max = element['count(messages)'];
            }
        })
        out = `User ${user} has used the word ${this.word} the most with ${max} occurences!`;
        console.log(out);
        return out;
    }
    
}