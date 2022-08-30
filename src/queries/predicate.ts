export class Predicate {
    name: string
    // Modifer to wrap predicate in EX: count()
    modifier: string | undefined
    // A predicate can represent an edge to another node by having it's own predicates
    children: Array<Predicate> | undefined
    

    //TODO: Convert modifiers to enum system

    /**
     * 
     * @param name : string | Name of predicate
     * @param modifier : string | Modifier to wrap predicate in
     */
    constructor(name: string, modifier?: string){
        this.name = name;
        this.modifier = modifier;
    }

    build(){
        if(this.modifier == undefined){
            return this.name;
        }
        else{
            return this.modifier + '(' + this.name + ')';
        }
    }
}