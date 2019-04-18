"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseClassManager_1 = require("../DatabaseManager/DatabaseClassManager");
const Class_1 = require("../Data/Class");
class ClassClient {
    constructor() {
        this.dbClassManager = new DatabaseClassManager_1.DatabaseClassManager();
    }
    getDbClassManager() {
        return this.dbClassManager;
    }
    deleteClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbClassManager.remove(classId);
        });
    }
    deleteStudent(classId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var students = _class.getStudents();
            if (students[0] !== "n") { //if there are students to remove
                if (students.length === 1) { //if it is the last exercise
                    students = ["n"];
                }
                else {
                    var indexToRemove = students.indexOf(studentId);
                    students.splice(indexToRemove, 1);
                }
                yield this.dbClassManager.update("data/classes/" + classId + "/students", students);
            }
        });
    }
    deleteExercise(classId, exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var exercises = _class.getExercises();
            if (exercises[0] !== "n") { //if there are exercises to remove
                if (exercises.length === 1) { //if it is the last exercise
                    exercises = ["n"];
                }
                else {
                    var indexToRemove = exercises.indexOf(exerciseId);
                    exercises.splice(indexToRemove, 1);
                }
                yield this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
            }
        });
    }
    addStudent(studentId, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var students = _class.getStudents();
            if (students[0] !== "n") { //if the class already has some students
                console.log("aggiungo studente");
                students.push(studentId);
            }
            else { //if there are no students
                console.log("primo studente");
                students[0] = studentId;
            }
            yield this.dbClassManager.update("data/classes/" + classId + "/students", students);
        });
    }
    addClass(name, description, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = new Class_1.Class("0", name, description, teacherId, ["n"], ["n"]);
            return yield this.dbClassManager.insert(_class);
        });
    }
    addExercise(exerciseId, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var exercises = _class.getExercises();
            if (exercises[0] !== "n") { //if the class already has some exercises
                console.log("aggiungo studente");
                exercises.push(exerciseId);
            }
            else { //if there are no exercises
                console.log("primo studente");
                exercises[0] = exerciseId;
            }
            yield this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
        });
    }
    getStudents(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            return _class.getStudents();
        });
    }
    getExercises(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            return _class.getExercises();
        });
    }
    /**
    This method returns a amp of entries string, string where the first string is the Id of the class and the second
     is the name of th class
     @param teacherId - the id of the teacher
     @returns Map<string,string>
     */
    getClassesByTeacher(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            var elements = yield this.dbClassManager.elements();
            var mapToReturn = new Map();
            //N.B. forEach(async (...)) doesn't work
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let value = entry[1];
                if (value === teacherId) {
                    let _class = yield this.dbClassManager.read(key);
                    mapToReturn.set(key, _class.getName());
                }
            }
            //console.log("mapToReturn: ",mapToReturn);
            return mapToReturn;
        });
    }
    getClassData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _class = yield this.dbClassManager.read(id);
            let _classData = _class.toJSON();
            return _classData;
        });
    }
}
exports.ClassClient = ClassClient;
//# sourceMappingURL=ClassClient.js.map