export class Predicate {
    name: string
    modifier: string | undefined

    constructor(name: string, modifier?: string){
        this.name = name;
        this.modifier = modifier;
    }
}