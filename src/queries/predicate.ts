export class Predicate {
    name: string
    pagination: string | undefined

    constructor(name: string, aggregation?: string){
        this.name = name;
        this.pagination = aggregation;
    }
}