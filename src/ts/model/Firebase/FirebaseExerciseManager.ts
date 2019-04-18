import {FirebaseManager} from "./FirebaseManager";
import {Data} from "../Data/Data";
import {Exercise} from "../Data/Exercise";

class FirebaseExerciseManager extends FirebaseManager {

    public constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseExerciseManager", this);
    }


    public async insert(obj: Data): Promise<boolean> {
        let exercise = <Exercise>obj;
        let exists : string= await this.search(exercise.getSentence());
        let wrsolution=exercise.getNewSolution();
        return new Promise(async function (resolve) {
            //scrivo esercizio
            if (exists === "false" && wrsolution !== null) {//exercise does not exist in the db
                console.log("inserting sentence");
                //key = this.writeSentence(exercise.getSentence(), exercise.getAuthorId());
                let ref = FirebaseManager.database.ref('data/sentences/').push({
                    sentence: exercise.getSentence(),
                    authorId: exercise.getAuthorId()
                });

                //scrivo soluzione
                let array = String(ref).split("/");
                let sentenceKey = array[array.length - 1];
                FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/').push({
                    "solverId": wrsolution.getSolverId(),
                    "tags": wrsolution.getSolutionTags(),
                    "topics": wrsolution.getTopics(),
                    "difficulty": wrsolution.getDifficulty(),
                    "valutations": wrsolution.JSONValutations(),
                    "time": Date.now()
                });
                resolve(true);
            }
            else if (exists !== "false" && wrsolution !== null) {
                FirebaseManager.database.ref('data/sentences/' + exists + '/solutions/').push({
                    "solverId": wrsolution.getSolverId(),
                    "tags": wrsolution.getSolutionTags(),
                    "topics": wrsolution.getTopics(),
                    "difficulty": wrsolution.getDifficulty(),
                    "valutations": wrsolution.JSONValutations(),
                    "time": Date.now()
                });
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */


    public async search(sentence: string): Promise<string> {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/sentences/').orderByChild('sentence')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().sentence.toLowerCase() === sentence.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve("false");
                    }
                    //console.log("database vuoto");
                    return resolve("false");
                });
        });
    }

    public async elements () : Promise<Map<string, string>> {
        let container = new Map<string, string>();
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/sentences')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            container.set(data.key, data.val().sentence);
                        });
                        //console.log("non esiste");
                        return resolve(container);
                    }
                    //console.log("database vuoto");
                    else {
                        return resolve(container);
                    }
                });
        });
    }

    public async read(id: string): Promise<Exercise> {
        const ProData: Promise <Exercise> = this.getExerciseById(id);
        const read = await ProData;
        return read;
    }

    private async getExerciseById(id : string) : Promise<Exercise> {

        return new Promise<Exercise>(function (resolve) {
            FirebaseManager.database.ref("data/sentences/" + id)
                .once('value', function (snapshot : any) {
                if (snapshot.exists()) {
                    let readData: any = snapshot.val();
                    let exercise = new Exercise(readData.sentence,readData.authorID);
                    exercise.setKey(id);
                    for (let sol in readData.solutions){
                        let vals = new Map<string,number>();

                        for (let val in readData.solutions[sol].valutations) {
                            vals.set(val, readData.solutions[sol].valutations[val]);
                        }
                        //console.log("solutionKey: ",sol);
                        exercise.addSolution(
                            sol,readData.solutions[sol].solverId,readData.solutions[sol].tags,
                            readData.solutions[sol].topics,readData.solutions[sol].difficulty,vals,readData.solutions[sol].time);
                    }


                    return resolve(exercise);
                }
                return resolve(undefined);
            });
        });
    }

    public async remove(id: string): Promise<boolean> {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

    private async removeFromId(id : string) {
        const ref=FirebaseManager.database.ref("data/sentences/" + id);
        // @ts-ignore
        return new Promise<boolean>(function (resolve) {
            ref.once('value',  function (snapshot: any) {
                if (snapshot.exists()) {
                    ref.remove();
                    // @ts-ignore
                    return resolve(true);
                }
                return resolve(false);
            });
        });
    }

    public async update (path:string, value: any) {
        let splittedPath =path.split("/");
        let position : number = splittedPath.length -1;
        let field : string=splittedPath[position];
        console.log(field);
        switch (field) {
            case "difficulty": await this.updateField(path, value); break;
            case "tags": await this.updateField(path, value); break;
            case "topics":await this.updateField(path, value); break;
            default : await console.log("field doesn't exists"); return;
        }
        await this.updateTime(path);
    }


    private async updateField(path : string, value:any) {
        const ref=FirebaseManager.database.ref(path);
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(value);
            }
        });
    }

    private async updateTime(path: string)  {
        // @ts-ignore
        let ref=FirebaseManager.database.ref(path).parent.child("time");
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(Date.now());
            }
        });
    }
}
export {FirebaseExerciseManager};