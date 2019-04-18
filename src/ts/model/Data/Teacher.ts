import {User} from "./User";
import {Class} from "./Class";

class Teacher extends User {

    private INPS : string;

    constructor (id:string, username : string, password: string, name : string, lastname:string, city:string, school : string, inps : string, email : string){
        super(id,username, password, name, lastname, city, school, email);
        this.INPS = inps;
    }

    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getTeacherID() === this.getID())
                lista.push(_class);
        });

        return lista;
    }

    public getINPS() {
            return this.INPS;
    }

    public isTeacher(): boolean {
        return true;
    }
}
export {Teacher}