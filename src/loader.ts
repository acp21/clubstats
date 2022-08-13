import dgraph from "dgraph-js";
import { conn } from "./app";


export class Loader {

    private async loadMessageEvent(message: any){
        let sender: string = message.sender;
        let body: string = message.content.body;
        let timestamp: string = message.origin_server_ts;

        // Find user who sent message and their uid
        let res: dgraph.Response = await conn.findUser(sender);
        // console.log(user.getJson())
        let users = res.getJson();
        // if their ID is already in DB, add message to them
        console.log(users.user[0]);
        if(users.user[0]){
            console.log("adding message");
            let uid = users.user[0].uid;

            let newMessage = {
                uid: uid,
                messages: [
                    {
                        nodeType: "message",
                        messageBody: body,
                        sendDate: new Date(timestamp).toISOString()
                    }
                ]
            };
            // Run mutation to add message to db
            await conn.runMutation(newMessage);
        }
        // Otherwise add user to db
        else{
            // TODO: Make sure to also add the message as well
            // Currently losing first message
            let newUser = {
                nodeType: 'user',
                joined: new Date('0').toISOString(),
                username: sender
            };
            await conn.runMutation(newUser)
        }
    }

    private async loadMembershipEvent(event: any){

    }

    // Entrypoint to load all message types
    // Other loading methods are private and should not be called directly
    async loadEventEntrypoint(event: any){
        console.log(event)
        if(event.type === 'm.room.member'){
            this.loadMembershipEvent(event);
        }
        else if(event.type === 'm.room.message'){
            this.loadMessageEvent(event);
        }
    }

}