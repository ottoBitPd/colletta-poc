import {DatabaseClassManager} from "../DatabaseManager/DatabaseClassManager";
import {Class} from "../Data/Class";
import {Data} from "../Data/Data";

class ClassClient{
    private dbClassManager : DatabaseClassManager;
    constructor(){
        this.dbClassManager= new DatabaseClassManager();
    }

    public getDbClassManager(): DatabaseClassManager {
        return this.dbClassManager;
    }
    public async deleteClass(classId:string): Promise<boolean>{
        return await this.dbClassManager.remove(classId);
    }
    public async deleteStudent(classId:string, studentId:string){
        var _class: Data = await this.dbClassManager.read(classId);
        var students:string []  = (<Class>_class).getStudents();
        if(students[0]!=="n") {//if there are students to remove
            if(students.length===1){//if it is the last exercise
                students = ["n"];
            }
            else {
                var indexToRemove: number = students.indexOf(studentId);
                students.splice(indexToRemove, 1);
            }
            await this.dbClassManager.update("data/classes/" + classId + "/students", students);
        }
    }
    public async deleteExercise(classId:string, exerciseId:string){
        var _class: Data = await this.dbClassManager.read(classId);
        var exercises:string []  = (<Class>_class).getExercises();
        if(exercises[0]!=="n") {//if there are exercises to remove
            if(exercises.length===1){//if it is the last exercise
                exercises = ["n"];
            }
            else {
                var indexToRemove: number = exercises.indexOf(exerciseId);
                exercises.splice(indexToRemove, 1);
            }
            await this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
        }
    }
    public async addStudent(studentId:string,classId:string){
        var _class:Data=await this.dbClassManager.read(classId);
        var students : string []= (<Class>_class).getStudents();
        if(students[0]!=="n") {//if the class already has some students
            console.log("aggiungo studente");
            students.push(studentId);
        }
        else {//if there are no students
            console.log("primo studente");
            students[0]=studentId;
        }
        await this.dbClassManager.update("data/classes/" + classId + "/students", students);
    }
    public async addClass(name:string, description:string, teacherId:string):Promise<boolean>{
        var _class = new Class("0",name, description,teacherId,["n"],["n"]);
        return await this.dbClassManager.insert(_class);
    }
    public async addExercise(exerciseId:string, classId:string){
        var _class : Data = await this.dbClassManager.read(classId);
        var exercises:string [] = (<Class>_class).getExercises();
        if(exercises[0]!=="n") {//if the class already has some exercises
            console.log("aggiungo studente");
            exercises.push(exerciseId);
        }
        else {//if there are no exercises
            console.log("primo studente");
            exercises[0]=exerciseId;
        }
        await this.dbClassManager.update("data/classes/"+ classId + "/exercises", exercises);
    }

    public async getStudents(classId:string): Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getStudents();
    }
    public async getExercises(classId:string):Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getExercises();
    }
    /**
    This method returns a amp of entries string, string where the first string is the Id of the class and the second
     is the name of th class
     @param teacherId - the id of the teacher
     @returns Map<string,string>
     */
    public async getClassesByTeacher(teacherId : string) : Promise<Map<string,string>> {
        var elements = await this.dbClassManager.elements();
        var mapToReturn = new Map<string, string>();
        //N.B. forEach(async (...)) doesn't work
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let value = entry[1];
            if(value===teacherId){
                let _class : Data = await this.dbClassManager.read(key);
                mapToReturn.set(key,(<Class>_class).getName());
            }
        }
        //console.log("mapToReturn: ",mapToReturn);
        return mapToReturn;
    }
    public async getClassData(id:string) : Promise<any> {
        const _class : Data = await this.dbClassManager.read(id);
        let _classData = (<Class> _class).toJSON();
        return _classData;
    }


}
export{ClassClient}
