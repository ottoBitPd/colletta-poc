import {POSManager} from '../POSManager/POSManager';
import {HunposManager} from "../POSManager/HunposManager";
import {Data} from "./Data";
import {Solution} from "./Solution";

class Exercise implements Data{
    private sentence: string;
    private authorId: string;
    private newSolution : Solution | null;
    private solutions : Solution [];
    private key: string;
    private hunpos: POSManager;


    constructor( sentence : string, authorId :string) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
        this.hunpos = new HunposManager();
    }

    getKey(): string {
        return this.key;
    }

    getSentence(): string {
        return this.sentence;
    }

    getPOSManager(): POSManager {
        return this.hunpos;
    }
    getAuthorId(): string {
        return this.authorId;
    }

    setKey(key: string): void {
        this.key=key;
    }

    setSentence(sentence: string): void {
        this.sentence=sentence;
    }

    setSolution(solverId: string, solutionTags: string[],topics : string[], difficulty : number) : void {
        this.newSolution = new Solution(undefined,solverId,solutionTags,topics,difficulty);
    }

    addSolution(key : string, solverId: string, solutionTags: string[], topics: string[],
                difficulty: number, valutations : Map<string,number>,time : number): void {
        this.solutions.push(new Solution(key,solverId, solutionTags, topics, difficulty, valutations, time));
    }

    getSolutions() : Solution []{
        return this.solutions;
    }

    addValutation(teacherID : string, mark : number) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID,mark);
        else
            throw new Error("Nessuna soluzione proposta");
    }

    getNewSolution() : Solution | null{
        return this.newSolution;
    }

    autosolve(): any{
        return this.getPOSManager().getSolution(this.getSentence());
    };

    getSplitSentence() : string []{
        //TODO splittare anche punteggiatura ma no apostrofo
        //creare un espressione regolare ed usarla per inserire uno spazio prima dei simboli e di punteggiatura dopo
        //gli apostrofi,
        //poi splittare in base allo spazio.
        return this.sentence.split(" ");
    }

    //da un voto alla soluzione corrente(newSolution) rispetto a solution con quel teacherID
    evaluate(teacherID?: string) : number {
        if(this.newSolution===null){
            return -1;
        }
        else{
            let tags:string [] = [];
            if(teacherID!==undefined){
                const teacherSolution=this.solutions.find(function(element){
                    return element.getSolverId()===teacherID;
                });
                if(teacherSolution===undefined){
                    throw new Error("ID non trovato");
                }
                else{
                    tags=teacherSolution.getSolutionTags();
                }
            }
            else{
                const hunposSolution=this.autosolve();
                for (let i in hunposSolution.sentence) {
                    tags.push(hunposSolution.sentence[i].label);
                }
            }
            return this.newSolution.evaluateSolution(tags);
        }
    }

    toJSON() : any{
        //Do I have to add solutions too? - Perry15
        let exercise: any = {
            "sentence": this.sentence,
            "authorId" : this.authorId,
            "key" : this.key
        };
        return exercise;
    }

}
export {Exercise};
