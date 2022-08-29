import { config } from "./app"

export function stringToUsername(username: string): string{
    username = '@' + username + ':' + config.homeserver;
    username = '"' + username + '"';
    return username   
}

export function getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;  
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
}