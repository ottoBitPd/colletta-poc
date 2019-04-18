import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseClassManager} from "../Firebase/FirebaseClassManager";


class DatabaseClassManager extends DatabaseManager{

    constructor(){
        super(new FirebaseClassManager());
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

    async search(id:string) : Promise<string> {
        return await this.getDatabase().search(id);
    }


    async update(path:string, value: any): Promise<void> {
        return await this.getDatabase().update(path,value);
    }
    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
}
export {DatabaseClassManager}
