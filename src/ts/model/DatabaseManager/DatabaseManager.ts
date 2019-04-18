import {Data} from "../Data/Data";

import {FirebaseManager} from "../Firebase/FirebaseManager";

abstract class DatabaseManager{
    private firebaseManager : FirebaseManager;

    constructor(fm :FirebaseManager){
        this.firebaseManager=fm;
    }

    protected getDatabase(){
        return this.firebaseManager;
    }

    public abstract insert(obj:Data) : Promise<boolean>;
    public abstract remove(id:string) : Promise<boolean> | null;
    public abstract read(id:string) : Promise<Data> | null;
    public abstract update(path:string, value: any) : void;
    public abstract elements() : Promise<Map<string, string>>;
    public abstract search(dataName:string) : Promise<string>;
}
export {DatabaseManager};