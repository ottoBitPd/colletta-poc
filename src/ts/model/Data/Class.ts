import {Data} from "./Data";

class Class implements Data {

    private id : string;
    private name : string;
    private description : string;
    private teacherID : string;
    private students : string[];
    private exercises : string[];

    constructor(id:string, name : string, description : string, teacherID : string, students : string[], exercises : string[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.teacherID = teacherID;
        this.students = students;
        this.exercises = exercises;
    }

    public getId() :string {
        return this.id;
    }

    public getName() : string {
        return this.name;
    }

    public getDescription() : string {
        return this.description;
    }

    public getTeacherID() : string {
        return this.teacherID;
    }

    public getStudents() : string[] {
        return this.students;
    }

    public getExercises() : string[] {
        return this.exercises;
    }

    public getNumberOfStudents() : number {
        return this.students.length;
    }

    public deleteStudent(student : string) : void {
        this.students = this.students.filter(s => s !== student);
    }

    public deleteExercise(exerKey : string) : void {
        this.exercises = this.exercises.filter(e => e !== exerKey);
    }

    public addStudent(student : string) : void {
        this.students.push(student);
    }

    public addExercise(exercise : string) : void {
        this.exercises.push(exercise);
    }

    public findStudent(student : string) : boolean {
        for(let i = 0; i<this.students.length; i++){
            if(this.students[i] === student)
                return true;
        }

        return false;
    }

    public toJSON() : any {
        let _class: any = {
            "id" : this.id,
            "name": this.name,
            "description": this.description,
            "teacherID": this.teacherID,
            "students": this.students,
            "exercises": this.exercises
        };
        return _class;
    }
}
export {Class};