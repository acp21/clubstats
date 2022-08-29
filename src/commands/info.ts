import { TrackableCommand } from "./subcommand";
import { Query } from "../queries/query";
import { Eq } from "../funcs/eq";
import { FuncUsage } from "../funcs/funcs";
import { Predicate } from "../queries/predicate";
import { stringToUsername } from "../useful";
import { getDayDiff } from "../useful";

export class Info extends TrackableCommand {

    constructor(user: string){
        let users: Array<string> = [user];
        super(users);
        this.cmdName = 'info';
        this.query = new Query(this.cmdName, new Eq(FuncUsage.ROOT, 'username', stringToUsername(user)));
    }

    protected override async runUnique(): Promise<string> {
        let messageCount: Predicate = new Predicate("messages", "count");
        let joinDate: Predicate = new Predicate("joinDate");
        this.query.addPredicate(messageCount);
        this.query.addPredicate(joinDate);
        this.query.print();
        let res = await this.query.run();
        let json = res.getJson();
        console.log(json['info'][0]);
        let data = json['info'][0];
        let messages: number = data['count(messages)'];
        let joined: Date = new Date(data['joinDate']);
        let diff: number = getDayDiff(joined, new Date());
        let out: string = `Info for User ${this.users}
        Messages: ${messages}
        Joined: ${joined.toString()}
        Average Messages/Day: ${messages / diff}`;
        console.log(out);
        return out;
    }
}