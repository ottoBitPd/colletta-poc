import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');

class ProfilePresenter extends PagePresenter{
    //private classClient : ClassClient | undefined;

    constructor(view : any){
        super(view);
        this.client = (new Client.builder()).buildUserClient().build();
    }

    update(app : any){
        app.post('/update', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient){
                const id = await userClient.search(session.username);
                const userData = await userClient.getUserData(id);
                let check : boolean =false;
                if(request.body.oldpassword==="" && request.body.password==="") {
                    console.log("pwd non cambia");
                    check = true;
                }
                if(request.body.oldpassword!=="" && request.body.password!=="") {
                    if (userClient.checkPassword(request.body.oldpassword,userData.password)) {
                        console.log("nuova password: "+request.body.password);
                        request.body.password = userClient.hashPassword(request.body.password);
                        check = true;
                        this.view.setError("Password modificata");
                    }
                    else {
                        console.log("pwd errata");
                        check = false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if(check===true && request.body.username==="") {
                    console.log("username non cambia");
                    check = true;
                }
                else {
                    if(check===true && await userClient.search(request.body.username)==="false") {
                        console.log("username cambia e ok");
                        check=true;
                    }
                    else {
                        console.log("username esistente o password errata");
                        check=false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if(check) {
                    this.view.setError("");
                    let userUpdateData: any = {};
                    console.log("POST: ",request.body);
                    for (let i in request.body) {
                        if (i !== "oldpassword" && i!=="inps"){
                            if (request.body[i]!=="") {
                                console.log('cambio');
                                userUpdateData[i] = request.body[i];
                            }
                            else
                                userUpdateData[i] = userData[i];
                        }
                    }
                    console.log("POST: ",userUpdateData);
                    if (await userClient.isTeacher(session.username)) {
                        //console.log("teacher");
                        if (/^[^\s]$/.test(request.body.inps))
                            userUpdateData.inps = request.body.inps;
                        else
                            userUpdateData.inps = userData.inps;
                        this.view.setUserKind(UserKind.teacher);
                    } else {
                        //console.log("student");
                        this.view.setUserKind(UserKind.student);
                    }
                    await userClient.updateUser(session.username, userUpdateData);
                    session.username = userUpdateData.username;
                }
            }
            response.redirect('/profile');
        });

        app.get('/profile', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient){
                const id = await userClient.search(session.username);
                const userData = await userClient.getUserData(id);
                //console.log("userData: ",userData);
                this.view.setUserData(userData);
                if (await userClient.isTeacher(session.username)){
                    //console.log("teacher");
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    //console.log("student");
                    this.view.setUserKind(UserKind.student);
                }
            }
            this.view.setTitle("Profilo");
            response.send(await this.view.getPage());
        });
    }
    public async getStudentClass () {
        let userClient= this.client.getUserClient();
        if(userClient){
            const id = await userClient.search(session.username);
            const userData = await userClient.getUserData(id);
            console.log("userData: ",userData.classId);
            return userData.classId;
        }
    }

}
export {ProfilePresenter};