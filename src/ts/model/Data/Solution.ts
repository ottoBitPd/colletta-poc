enum Difficulty {
    veryeasy =1,
    easy = 2,
    normal = 3,
    hard = 4,
    veryhard = 5,
}
class Solution {
    private key : string | null; // chiave univoca della soluzione
    private solverId : string;//id dell'autore della soluzione
    private solutionTags: string [];//soluzione proposta
    private topics: string [] | null;//gli argomenti della soluzione
    private difficulty: Difficulty | null;//la difficoltà dell'esercizio
    private valutations : Map<string,number> | null; // coppie di valutazioni con chiave insegnante e valore la valutazione ottenuta
    private time : number | null;

    // @ts-ignore
    constructor(key? : string, solverId: string, solutionTags: string[], topics? : string[], difficulty? : Difficulty, valutations? : Map<string,number>, time? : number) {
        this.key = key || null;
        this.solverId = solverId;
        this.solutionTags = solutionTags;
        this.topics = topics || null;
        this.difficulty = difficulty|| null;
        this.valutations = valutations|| null;
        this.time = time || null;
    }
    // @ts-ignore
    constructor();
    /*constructor() {
        this.solverId = "-1";
        this.solutionTags = [];
        this.correctionTags = [];
        this.teacherId = "-1";
        this.topics = [];
        this.difficulty = 1;
    }*/
    getKey(): string | null{
        return this.key;
    }

    getSolverId(): string {
        return this.solverId;
    }

    getTopics(): string[] | null {
        return this.topics;
    }

    getDifficulty() : number | null{
        return this.difficulty;
    }

    getSolutionTags() : string []{
        return this.solutionTags;
    }

    getValutations(): Map<string, number> | null {
        return this.valutations;
    }

    JSONValutations() : any {
        let result = "{";
        if (this.valutations){
            this.valutations.forEach((value, key) => {
                result += '"' + key +'" : '+value+",";
            });
         }
        if (result !== "{")
            result = result.substr(0,result.length-1);
        result += "}";
        return JSON.parse(result);
    }

    getTime(): number | null{
        return this.time;
    }

    addNewMark(teacherID : string, mark : number) {
        if (!this.valutations)
            this.valutations = new Map<string, number>();
        this.valutations.set(teacherID,mark);
    }

    evaluateSolution(tags: string []):number{
        var rightTagsNumber=0;
        let mySolutionTags=this.getSolutionTags();
        for(let j =0; j<mySolutionTags.length;j++){
            if(mySolutionTags[j]===tags[j]){
                rightTagsNumber++;
            }
        }
        return ((rightTagsNumber*10)/mySolutionTags.length);
    }
}
export {Solution};