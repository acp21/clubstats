import settings from "../config.json"

export class Configuration {
    endpoint: string

    constructor(){
        this.endpoint = settings.endpoint
    }
}