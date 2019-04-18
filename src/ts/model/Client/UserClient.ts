import {DatabaseUserManager} from "../DatabaseManager/DatabaseUserManager";
import {Data} from "../Data/Data";
import {Teacher} from "../Data/Teacher";
import {Student} from "../Data/Student";
import {User} from "../Data/User";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    private passwordHash = require('bcryptjs');
    constructor(){
        this.dbUserManager = new DatabaseUserManager();
    }

    async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Student("0",username, password, name, surname, city, school, email));
    }
    async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Teacher("0",username, password, name, surname, city, school, inps, email));
    }
    async verifyUser(username: string, insertedPassword : string) : Promise<boolean>{
        const idUser = await this.dbUserManager.search(username);
        if(idUser!=="false") {
            const user: Data | null = await this.dbUserManager.read(idUser);
            if (user !== null) {
                const password = (<User>user).getPassword();
                return this.checkPassword(insertedPassword,password);
            } else {
                //console.log("password dont match")
                return false;
            }
        }
        else{
            return false;
        }

    }
    public checkPassword(insertedPassword:string,password:string) : boolean{
        if (this.passwordHash.compareSync(insertedPassword, password)) {
            //console.log("password match");
            return true;
        } else {
            //console.log("password dont match")
            return false;
        }
    }

    public async isTeacher(username:string) : Promise<boolean> {
        const id = await this.dbUserManager.search(username);
        const user = await this.dbUserManager.read(id);
        //console.log((<User>user));
        //console.log((<User>user).getUsername());
        if (user !== undefined)
            return (<User>user).isTeacher();
        else
            return false;
    }

    async teacherList() : Promise<string[]> {
        let teacherMap = await this.dbUserManager.elements();
        let list : string[] = [];

        for (let teacher of teacherMap){
            let condition = await  this.isTeacher(teacher[1]);
            if (condition)
                list.push(teacher[0]);
        }
        return list;
    }

    async search(username:string) : Promise<string> {
        return await this.dbUserManager.search(username);
    }

    public async getUserData(id:string) : Promise<any> {
        const user : Data = await this.dbUserManager.read(id);
        let userData = (<User> user).toJSON();
        if((<User> user).isTeacher()){
            userData.inps = (<Teacher> user).getINPS();
        }
        else if((<User> user).isStudent()){
            userData.classId = (<Student> user).getClassId();
        }
        return userData;
    }
    public async updateUser(username:string, userUpdateData : any){
        const id = await this.dbUserManager.search(username);
        await this.dbUserManager.update('data/users/'+id+'/name',userUpdateData.name);
        await this.dbUserManager.update('data/users/'+id+'/lastname',userUpdateData.lastname);
        await this.dbUserManager.update('data/users/'+id+'/city',userUpdateData.city);
        await this.dbUserManager.update('data/users/'+id+'/school',userUpdateData.school);
        await this.dbUserManager.update('data/users/'+id+'/email',userUpdateData.email);
        await this.dbUserManager.update('data/users/'+id+'/username',userUpdateData.username);
        await this.dbUserManager.update('data/users/'+id+'/password',userUpdateData.password);
        if(userUpdateData.inps !==undefined){
            await this.dbUserManager.update('data/users/'+id+'/INPScode',userUpdateData.inps);
        }
    }

    /**
     *
     * @param substring
     * @param teacher - false if you want to search student only, true if you want to search teacher only
     */
    public async searchUser(substring : string, teacher : boolean) : Promise<Map<string, string>> {
        var regex = new RegExp(substring, "i");
        var elements = await this.dbUserManager.elements();//returns a map<id,sentence> of all exercises in the db
        var mapToReturn = new Map<string, string>();
        console.log("User: ", elements);

        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let value = entry[1];
            let user: Data = await this.dbUserManager.read(key);
            if (teacher && (<User>user).isTeacher()) {
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            }
            else if (!teacher && !(<User>user).isTeacher()){
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            }
        }

        return mapToReturn;
    }
    public hashPassword(plain :string){
        return this.passwordHash.hashSync(plain,10);
    }

    public async addClassToStudent(studentId: any, classId: any) {
        await this.dbUserManager.update('data/users/'+studentId+'/classId',classId);
    }

}
export{UserClient}