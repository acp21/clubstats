import { conn } from "./app";


export class Loader {

    async loadMessage(message: any){
        let sender: string = message.sender;
        let body: string = message.content.body;
        let timestamp: string = message.origin_server_ts;

        // Find user who sent message and their uid
        let res = await conn.findUser(sender);
        // console.log(user.getJson())
        let user = res.getJson();
        // if their ID is already in DB, add message to them
        if(user.username === sender){
            let uid = user.uid;

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
            let newUser = {
                nodeType: 'user',
                joined: new Date('0').toISOString(),
                username: sender
            };
            await conn.runMutation(newUser)
        }
    }

    async loadMembershipEvent(event: any){

    }


}