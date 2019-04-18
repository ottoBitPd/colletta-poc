import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');

class ClassPresenter extends PagePresenter {
    private classId : any;
    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }

    update(app: any) {
        this.class(app);
        this.deleteStudent(app);
        this.deleteExercise(app);
        this.addStudent(app);
        this.addExercise(app);
    }

    private setClassId( value : string){
        this.classId = value;
    }
    public getClassId(){
        return this.classId;
    }
    private class(app : any){
        app.get('/class', async (request: any, response: any) => {
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }
            this.setClassId(request.query.classId);
            this.view.setTitle("Classe");
            this.view.setMenuList(menuList);
            let userClient= this.client.getUserClient();
            if(userClient){
                if(await userClient.isTeacher(session.username))
                    this.view.setUserKind(UserKind.teacher);
                else
                    this.view.setUserKind(UserKind.student);
            }

            /*console.log("Id della classe: "+request.query.classId);
            this.view.setClass(await this.getClassData(request.query.classId));
            let students = await this.getStudents(request.query.classId);
            console.log("Studenti: ",students);
            this.view.setStudentsList(students);
            let exercises = await this.getExercises(request.query.classId);
            console.log("Exercises: ",exercises);
            this.view.setExercisesList(exercises);*/
            response.send(await this.view.getPage());
        });
    }

    /**
     * This method returns an array of json that represents the students of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    public async getStudents() : Promise<any>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(this.classId);
            for (let i in studentsId) {
                console.log("students: ", studentsId[i]);
            }
            if (studentsId.length > 0 && studentsId[0]!=="n") {//it there are students in the class
                let students = new Array();//array di json student
                for (let i in studentsId) {
                    let student = await userClient.getUserData(studentsId[i]);
                    students.push(student);
                }
                return students;
            }
        }
    }
    /**
     * This method returns an array of json that represents the exercises of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    //@ts-ignore
    public async getExercises() : Promise<any>{
        let classClient = this.client.getClassClient();
        let exerciseClient = this.client.getExerciseClient();
        if(classClient && exerciseClient) {
            let exercisesId = await classClient.getExercises(this.classId);
            if (exercisesId.length > 0 && exercisesId[0]!=="n") {//it there are students in the class
                let exercises = new Array();//array di json student
                for (let i in exercisesId) {
                    let exercise = await exerciseClient.getExerciseData(exercisesId[i]);
                    exercises.push(exercise);
                }
                return exercises;
            }
        }
    }
    public async getClass() : Promise<any>{
        let classClient = this.client.getClassClient();
        if(classClient) {
            let _class = await classClient.getClassData(this.classId);
            return _class;
        }
    }
    private deleteStudent(app: any) {
        app.post('/deletestudent', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteStudent(request.body.classId, request.body.studentId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+request.body.classId);
            //response.redirect(307, '/class');
        });
    }
    private deleteExercise(app: any) {
        app.post('/deleteexercise', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteExercise(request.body.classId, request.body.exerciseId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+request.body.classId);
            //response.redirect(307, '/class');
        });
    }

    public async getStudentNumber() {
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(this.classId);
            if (studentsId[0]==="n") {//it there are students in the class
                return 0;
            }
            return studentsId.length;
        }
        return -1;
    }
    public async getClasses(){
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            //console.log("username: "+session.username);
            let id = await userClient.search(session.username);
            if(id !== "false") {
                let map = await classClient.getClassesByTeacher(id);//returns map<idClasse, className>
                return map;
            }
        }
        return new Map();
    }

    private addStudent(app: any) {
        app.post('/addstudent', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if(classClient && userClient) {
                console.log("studentId: "+request.body.studentId+" classId: "+this.classId);
                await classClient.addStudent(request.body.studentId,this.classId);
                //ritorna boolean per gestione errore
                await userClient.addClassToStudent(request.body.studentId,this.classId);
            }
            response.redirect('/class?classId='+this.classId);
            //response.redirect(307, '/class');
        });
    }

    private addExercise(app: any) {
        app.post('/addexercise', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.addExercise(request.body.exerciseId,this.classId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+this.classId);
            //response.redirect(307, '/class');
        });
    }
}
export {ClassPresenter};