import { Connection } from './connection';

const fs = require('fs');

let rawdata = fs.readFileSync('full.json');
let data = JSON.parse(rawdata);
var messages = data.messages

export async function loadData(conn: Connection){

    var cur;
    var type;
    var foundUser;
    var newUser;
    var uid;

    for (let i in messages){
        cur = messages[i];
        type = cur.type;
    
        if(type == 'm.room.member'){
            foundUser = await conn.findUser(cur.user_id.split(':', 1)[0])
            
            // Add event if user already stored
            if(foundUser.getJson().user.length > 0){
                let newEvent: object = {
                    uid: uid,
                    events: [
                        {
                            type: 'event',
                            membership: cur.content.membership,
                            eventDate: new Date(cur.origin_server_ts).toISOString()
                        }
                    ]
                    
                };

                await conn.runMutation(newEvent);

            }
            
            // Add user if not already in DB
            else{
                console.log("User not found, adding");
                newUser = {
                    type: 'user',
                    joined: new Date(cur.origin_server_ts).toISOString(),
                    username: cur.user_id.split(':', 1)
                }

                await conn.runMutation(newUser);
                console.log("Added User");
            }
        }
        
        // If event is message, store that with proper user
        else if(type === 'm.room.message'){
            foundUser = await conn.findUser(cur.user_id.split(':', 1)[0]);
            uid = foundUser.getJson().user[0].uid;
            
            var newMessage = {
                uid: uid,
                messages: [
                    {
                        type: "message",
                        body: cur.content.body,
                        sendDate: new Date(cur.origin_server_ts).toISOString()
                    }
                ]
            };

            
            await conn.runMutation(newMessage);

        }
    }
}