import settings from "../config.json"

export class Configuration {
    endpoint: string;
    has_remote: boolean;
    homeserver: string;
    allow_debug: boolean;

    constructor(){
        this.endpoint = settings.endpoint;
        this.has_remote = settings.has_remote;
        this.homeserver = settings.homeserver;
        this.allow_debug = settings.allow_debug;
    }

    setEndpoint(endpoint: string){
        this.endpoint;
        settings.endpoint = endpoint;
    }
}