"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Class {
    constructor(id, name, description, teacherID, students, exercises) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.teacherID = teacherID;
        this.students = students;
        this.exercises = exercises;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getTeacherID() {
        return this.teacherID;
    }
    getStudents() {
        return this.students;
    }
    getExercises() {
        return this.exercises;
    }
    getNumberOfStudents() {
        return this.students.length;
    }
    deleteStudent(student) {
        this.students = this.students.filter(s => s !== student);
    }
    deleteExercise(exerKey) {
        this.exercises = this.exercises.filter(e => e !== exerKey);
    }
    addStudent(student) {
        this.students.push(student);
    }
    addExercise(exercise) {
        this.exercises.push(exercise);
    }
    findStudent(student) {
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i] === student)
                return true;
        }
        return false;
    }
    toJSON() {
        let _class = {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "teacherID": this.teacherID,
            "students": this.students,
            "exercises": this.exercises
        };
        return _class;
    }
}
exports.Class = Class;
//# sourceMappingURL=Class.js.map