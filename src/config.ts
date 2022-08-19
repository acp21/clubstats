import settings from "../config.json"

export class Configuration {
    endpoint: string;
    has_remote: boolean;
    homeserver: string;

    constructor(){
        this.endpoint = settings.endpoint;
        this.has_remote = settings.has_remote;
        this.homeserver = settings.homeserver;
    }

    setEndpoint(endpoint: string){
        this.endpoint;
        settings.endpoint = endpoint;
    }
}