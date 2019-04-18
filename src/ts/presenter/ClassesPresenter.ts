import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

var session = require('express-session');

class ClassesPresenter extends PagePresenter {

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().build();
    }

    update(app: any) {
        this.classes(app);
        this.insertClass(app);
        this.deleteClass(app);
    }
    private classes(app : any){
        app.get('/classes', async (request: any, response: any) => {
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }

            this.view.setMenuList(menuList);
            this.view.setTitle("Le tue classi");
            response.send(await this.view.getPage());
        });
    }
    private insertClass(app: any) {
        app.post('/insertclass', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if(classClient && userClient) {
                let id = await userClient.search(session.username);
                if(id !== "false") {
                    classClient.addClass(request.body.classname, request.body.description, id);
                }
            }
            response.redirect('/classes');
        });
    }
    private deleteClass(app: any) {
        app.post('/deleteclass', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteClass(request.body.key);
                //ritorna boolean per gestione errore
            }
            response.redirect('/classes');
        });
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
}
export {ClassesPresenter}

