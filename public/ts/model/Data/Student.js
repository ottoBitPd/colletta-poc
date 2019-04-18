"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Student extends User_1.User {
    constructor(id, username, password, name, lastname, city, school, email, classId) {
        super(id, username, password, name, lastname, city, school, email);
        if (classId)
            this.classId = classId;
        else
            this.classId = "undefined";
    }
    getClasses(classList) {
        let list = [];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1) {
                list.push(_class);
            }
        });
        return list;
    }
    getAverage(exercises) {
        let averageMap = new Map();
        let solutions = [];
        exercises.forEach((currentValue, index) => {
            solutions = solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === this.getID()));
        });
        let sumTotal = 0;
        var i = 0;
        solutions.forEach((currentValue, index) => {
            let sumSingleSolution = 0;
            currentValue.getValutations().forEach((value, key) => {
                sumSingleSolution += value;
                i++;
            });
            sumTotal += sumSingleSolution;
            let media = sumTotal / i;
            averageMap.set(currentValue.getTime(), media);
        });
        return averageMap;
    }
    isStudent() {
        return true;
    }
    getClassId() {
        return this.classId;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map