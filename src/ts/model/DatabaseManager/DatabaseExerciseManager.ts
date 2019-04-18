import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseExerciseManager} from "../Firebase/FirebaseExerciseManager";



class DatabaseExerciseManager extends DatabaseManager{

    constructor(){
        super(new FirebaseExerciseManager());
    }

    async insert(obj:Data) : Promise<boolean> {
        return await this.getDatabase().insert(obj);
    }

     async remove(id:string) : Promise<boolean> {
        return await this.getDatabase().remove(id);
    }

    async read(id:string) : Promise<Data> {
        return await this.getDatabase().read(id);
    }

    async search(sentence: string):  Promise<string>{
        return await this.getDatabase().search(sentence);
    }

    async update(path:string, value:any): Promise<void>{

        return await this.getDatabase().update(path, value);
    }

    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
}
export {DatabaseExerciseManager}
