import { connect } from 'http2';
import { Connection } from './connection';
import * as data from "./export.json";

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
            
            if(foundUser.getJson().user.length > 0){
                // TODO: Add user event if user already exists
            }
            else{
                console.log("User not found, adding");
                newUser = {
                    type: 'member',
                    joined: cur.origin_server_ts,
                    username: cur.user_id.split(':', 1)
                }

                await conn.runMutation(newUser);
                console.log("Added User");
            }
        }
    
        else if(type === 'm.room.message'){
            foundUser = await conn.findUser(cur.user_id.split(':', 1)[0]);
            uid = foundUser.getJson().user[0].uid;
            
            var newMessage = {
                    type: "message",
                    body: cur.content.body,
                    sendDate: cur.origin_server_ts,
                    sender: {
                        uid: uid
                    }
                };

            await conn.runMutation(newMessage);

        }
    }
}







