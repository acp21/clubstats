export class Predicate {
    name: string
    modifier: string | undefined
    // A predicate can represent an edge to another node by having it's own predicates
    children: Array<Predicate> | undefined

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