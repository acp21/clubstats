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

export async function loadSchemas(conn: Connection){
    // All schema that will be shared between nodes initialized here
    const sharedSchema = `nodeType: string @index(exact) .
                          eventID: string .
                          eventDate: datetime .`;
    conn.updateSchema(sharedSchema);          
    userSchema(conn);
}