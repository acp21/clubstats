import { config } from "./app"

export function stringToUsername(username: string): string{
    username = '@' + username + ':' + config.homeserver;
    return username   
}