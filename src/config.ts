import settings from "../config.json"

export class Configuration {
    endpoint: string
    has_remote: boolean

    constructor(){
        this.endpoint = settings.endpoint;
        this.has_remote = settings.has_remote;
    }
}