import { Connection } from "./connection";


function userSchema(conn: Connection){
    const schema = `username: string @index(exact) .
                    joinDate: dateTime .
                    message: [uid] .`;
    conn.updateSchema(schema);
}

function messageSchema(conn: Connection){
    const schema = `messageBody: string .
                    `
}

function userNode(conn: Connection){
    const schema = `type User = {
        nodeType
        joinDate
        username
    } .`
    conn.updateSchema(schema);
}

export async function loadSchemas(conn: Connection){
    // All schema that will be shared between nodes initialized here
    const sharedSchema = `nodeType: string @index(exact) .
                          eventID: string @index(exact) .
                          eventDate: datetime @index(day) .`;
    conn.updateSchema(sharedSchema);          
    userSchema(conn);
    // userNode(conn);
    console.log("Schemas updated.");
}