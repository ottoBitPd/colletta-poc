import {FirebaseManager} from "./FirebaseManager";
import {Data} from "../Data/Data";
import {Class} from "../Data/Class";

class FirebaseClassManager extends FirebaseManager {
    constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseClassManager", this);
    }

    public async insert(obj: Data): Promise<boolean> {
        const _class = <Class>obj;
        const exists : string = await this.search(_class.getName());
        return new Promise(async function (resolve) {
            if (exists === "false") {
                FirebaseManager.database.ref('data/classes').push({
                    name: _class.getName(),
                    description: _class.getDescription(),
                    students: _class.getStudents(),
                    teacherID: _class.getTeacherID(),
                    exercises: _class.getExercises()
                });
                return resolve(true);
            } 
            else {
                return resolve(false);
            }
        });
    }

    public async search(name:string): Promise<string> {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/classes/')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().name.toLowerCase() === name.toLowerCase()) {
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

    /**
     * this methos returns a map which has entries containing  the id of a class as key and the id of the class' teacher
     * as value. the will contains all the classes that are in the db.
     */
    public async elements () : Promise<Map<string, string>> {
        let container = new Map<string, string>();
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/classes')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            //container.set(data.key, data.val().name);
                            //siccome mi sembrava un metodo mai utlizzato e a me serviva idClass, idTeacher
                            //ho cambiato la mappa ritornata dal metodo Perry15
                            container.set(data.key, data.val().teacherID);
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

    public async read(id: string): Promise<Data> {
        const ProData: Promise <Class> = this.getClassById(id);
        const readed = await ProData;
        return readed;
    }

    private async getClassById(id : string) : Promise<Class> {
        return new Promise<Class>(function (resolve) {
            FirebaseManager.database.ref("data/classes/" + id)
                .once('value', function (snapshot : any) {
                    if (snapshot.exists()) {
                        const readData: any = snapshot.val();
                        const _class = new Class(id,readData.name, readData.description, readData.teacherID,
                            readData.students, readData.exercises);
                        return resolve(_class);
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
        const ref=FirebaseManager.database.ref("data/classes/" + id);
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
        const splittedPath =path.split("/");
        const position : number = splittedPath.length -1;
        const field : string=splittedPath[position];
        //console.log(field+ "path: " + path +" value: "+value);
        switch (field) {
            case "exercises": await this.updateField(path, value); break;
            case "students": await this.updateField(path, value); break;
            default : console.log("field doesn't exists"); return;
        }
    }


    private async updateField(path : string, value:any) {
        const ref=FirebaseManager.database.ref(path);
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(value);
            }
        });
    }

}

export{FirebaseClassManager};
