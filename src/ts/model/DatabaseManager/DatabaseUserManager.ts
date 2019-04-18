import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseUserManager} from "../Firebase/FirebaseUserManager";


class DatabaseUserManager extends DatabaseManager{

    constructor(){
        super(new FirebaseUserManager());
    }
    async insert(obj:Data) : Promise<boolean> {
        return await this.getDatabase().insert(obj);
    }
    async remove(id:string) : Promise<boolean> {
        return await this.getDatabase().remove(id);
    }
    async read(id:string) : Promise<Data>{
        return await this.getDatabase().read(id);
    }

    async update(path:string, value: any): Promise<void>{
        return await this.getDatabase().update(path,value);
    }
    async search(username:string) : Promise<string>{
        return await this.getDatabase().search(username);
    }
    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
}
export {DatabaseUserManager}
