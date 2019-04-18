import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";

class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }

    public async autosolve(sentence: string, authorId :string) : Promise<string[]>{
        console.log("sentence: ",sentence);
        let exercise = new Exercise(sentence,authorId);
        let autosolution = exercise.autosolve();
        console.log("autosolution: ",autosolution);
        let result = [];
        for (let value of autosolution.sentence){
            result.push(value.label);
        }
        return result;
    }

    public getSplitSentence(sentence:string) : string []{
        return sentence.split(" ");
    }

    public insertExercise(sentence: string , authorId :string, solution : any, valutation :any) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solution[0],solution[1],solution[2],solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }

    async searchExercise(substring:string) : Promise<Map<string, string>>{
        var regex = new RegExp(substring,"i");
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var mapToReturn = new Map<string, string>();
        elements.forEach(function (value:string, key:string){
            if(value.search(regex)>=0){
                mapToReturn.set(key,value);
            }
        });
        return mapToReturn;
        /*
        //old version bisogna ritornare una mappa
        var ids:string [] = [];
        var exercises: Exercise [] = [];
        elements.forEach(function (value:string, key:string){
            if(value.search(regex)>=0){
                ids.push(key);
            }
        });
        for(var i in ids){
            exercises.push(<Exercise>await this.getExercise(ids[i]));
        }
        return exercises;*/
    }

    /*
    //lo usava la vecchia versione di searchExercise
    private async getExercise(id:string):Promise<Data>{
        return await this.dbExerciseManager.read(id);
    }*/

    /**
     * @param sentence
     * @param solverID
     * @return a JSON of this form
     *          {
     *              "id" : solverID,
     *              "tags" : solutionTags,
     *              "time" : solutionTime
     *          }
     */
    async searchSolution(sentence:string,solverID: string) : Promise<any[]>{/*
        var mapToReturn = new Map<string, string>();
        var exerciseKey = await this.dbExerciseManager.search(sentence);
        //console.log("exerciseKey: ",exerciseKey);
        if(exerciseKey !== "false"){
            var exercise : Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            var solutions = (<Exercise>exercise).getSolutions();
            for(let i in solutions){
                let key = solutions[i].getKey();
                if(key!==null) {
                    mapToReturn.set(key, solutions[i].getSolverId());
                }
            }
            //console.log("mapToReturn: ",mapToReturn);
            return mapToReturn;
        }
        //console.log("nessun esercizio trovato");
        mapToReturn.set("false","false");//nessun esercizio trovato
        return mapToReturn;*/

        let result : any[] = [];
        let exerciseKey = await this.dbExerciseManager.search(sentence);
        //console.log("exerciseKey: ",exerciseKey);
        if(exerciseKey !== "false") {
            let exercise: Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            let solutions = (<Exercise>exercise).getSolutions();
            for(let value of solutions) {
                if (value.getSolverId() === solverID)
                    result.push(
                        {
                            "id" : value.getKey(),
                            "userID" : value.getSolverId(),
                            "tags" : value.getSolutionTags(),
                            "time" : value.getTime(),
                            "difficulty" : value.getDifficulty(),
                            "topics" : value.getTopics()
                        });
            }
        }
        return result;
    }

    public async getSentence(id: string): Promise<string> {
        var exercise : Data = await this.dbExerciseManager.read(id);
        //console.log(exercise);
        return (<Exercise>exercise).getSentence();
    }

    public async evaluate(newSolution : string[],solverID : string,topics : string[], sentence : string, difficulty : number ,teacherID? : string) : Promise<number> {
        let exercise: Exercise;

        if (teacherID !== undefined)
            exercise = <Exercise>(await this.dbExerciseManager.read(await this.dbExerciseManager.search(sentence)));
        else
            exercise = new Exercise(sentence, solverID);

        exercise.setSolution(solverID, newSolution, topics, difficulty);
        return exercise.evaluate(teacherID);
    }

    public async getExerciseData(id:string) : Promise<any> {
        const exercise : Data = await this.dbExerciseManager.read(id);
        let exerciseData = (<Exercise>exercise).toJSON();
        return exerciseData;
    }
}
export{ExerciseClient}
