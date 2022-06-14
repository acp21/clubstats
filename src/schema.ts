import { Connection } from "./connection";

export function userSchema(conn: Connection){
    const schema = `username: string @index(exact) .
                    joined: dateTime .
                    message: [uid] .`
    conn.updateSchema(schema);
}

export async function loadSchemas(conn: Connection){
    userSchema(conn);
}