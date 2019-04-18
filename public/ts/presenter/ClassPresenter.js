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
const PagePresenter_1 = require("./PagePresenter");
const Client_1 = require("../model/Client/Client");
const PageView_1 = require("../view/PageView");
var session = require('express-session');
class ClassPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }
    update(app) {
        this.class(app);
        this.deleteStudent(app);
        this.deleteExercise(app);
        this.addStudent(app);
        this.addExercise(app);
    }
    setClassId(value) {
        this.classId = value;
    }
    getClassId() {
        return this.classId;
    }
    class(app) {
        app.get('/class', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let menuList;
            menuList = {
                0: { "link": "/", "name": "Homepage" }
            };
            this.setClassId(request.query.classId);
            this.view.setTitle("Classe");
            this.view.setMenuList(menuList);
            let userClient = this.client.getUserClient();
            if (userClient) {
                if (yield userClient.isTeacher(session.username))
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                else
                    this.view.setUserKind(PageView_1.UserKind.student);
            }
            /*console.log("Id della classe: "+request.query.classId);
            this.view.setClass(await this.getClassData(request.query.classId));
            let students = await this.getStudents(request.query.classId);
            console.log("Studenti: ",students);
            this.view.setStudentsList(students);
            let exercises = await this.getExercises(request.query.classId);
            console.log("Exercises: ",exercises);
            this.view.setExercisesList(exercises);*/
            response.send(yield this.view.getPage());
        }));
    }
    /**
     * This method returns an array of json that represents the students of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if (classClient && userClient) {
                let studentsId = yield classClient.getStudents(this.classId);
                for (let i in studentsId) {
                    console.log("students: ", studentsId[i]);
                }
                if (studentsId.length > 0 && studentsId[0] !== "n") { //it there are students in the class
                    let students = new Array(); //array di json student
                    for (let i in studentsId) {
                        let student = yield userClient.getUserData(studentsId[i]);
                        students.push(student);
                    }
                    return students;
                }
            }
        });
    }
    /**
     * This method returns an array of json that represents the exercises of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    //@ts-ignore
    getExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let exerciseClient = this.client.getExerciseClient();
            if (classClient && exerciseClient) {
                let exercisesId = yield classClient.getExercises(this.classId);
                if (exercisesId.length > 0 && exercisesId[0] !== "n") { //it there are students in the class
                    let exercises = new Array(); //array di json student
                    for (let i in exercisesId) {
                        let exercise = yield exerciseClient.getExerciseData(exercisesId[i]);
                        exercises.push(exercise);
                    }
                    return exercises;
                }
            }
        });
    }
    getClass() {
        return __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            if (classClient) {
                let _class = yield classClient.getClassData(this.classId);
                return _class;
            }
        });
    }
    deleteStudent(app) {
        app.post('/deletestudent', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            if (classClient) {
                yield classClient.deleteStudent(request.body.classId, request.body.studentId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId=' + request.body.classId);
            //response.redirect(307, '/class');
        }));
    }
    deleteExercise(app) {
        app.post('/deleteexercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            if (classClient) {
                yield classClient.deleteExercise(request.body.classId, request.body.exerciseId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId=' + request.body.classId);
            //response.redirect(307, '/class');
        }));
    }
    getStudentNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if (classClient && userClient) {
                let studentsId = yield classClient.getStudents(this.classId);
                if (studentsId[0] === "n") { //it there are students in the class
                    return 0;
                }
                return studentsId.length;
            }
            return -1;
        });
    }
    getClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if (classClient && userClient) {
                //console.log("username: "+session.username);
                let id = yield userClient.search(session.username);
                if (id !== "false") {
                    let map = yield classClient.getClassesByTeacher(id); //returns map<idClasse, className>
                    return map;
                }
            }
            return new Map();
        });
    }
    addStudent(app) {
        app.post('/addstudent', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if (classClient && userClient) {
                console.log("studentId: " + request.body.studentId + " classId: " + this.classId);
                yield classClient.addStudent(request.body.studentId, this.classId);
                //ritorna boolean per gestione errore
                yield userClient.addClassToStudent(request.body.studentId, this.classId);
            }
            response.redirect('/class?classId=' + this.classId);
            //response.redirect(307, '/class');
        }));
    }
    addExercise(app) {
        app.post('/addexercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            if (classClient) {
                yield classClient.addExercise(request.body.exerciseId, this.classId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId=' + this.classId);
            //response.redirect(307, '/class');
        }));
    }
}
exports.ClassPresenter = ClassPresenter;
//# sourceMappingURL=ClassPresenter.js.map