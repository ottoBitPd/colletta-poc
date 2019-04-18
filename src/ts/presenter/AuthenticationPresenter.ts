import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

const session = require('express-session');

class AuthenticationPresenter extends PagePresenter {
    private passwordHash = require('bcryptjs');

    constructor(view : any){
        super(view);
        this.client = (new Client.builder()).buildUserClient().build();
    }

    update(app: any) {
        app.get('/logout', (request: any, response: any) => {
            console.log("LOGOUT");
            //TODO trovarle e cancellarle tutte
            delete session.invalidLogin;
            delete session.errUsername;
            delete session.username;
            delete session.password;
            response.redirect('/');
        });
        app.get('/profile', (request: any, response: any) => {
            response.send("Login avvenuto con successo sei nel tuo profilo"+session.username);
        });
        app.get('/login', async (request: any, response: any) => {
            if(request.query.mess==="invalidLogin") {
                this.view.setError("username o password invalidi");
            }
            else{
                this.view.setError("");
            }
            response.send(await this.view.getPage());
        });
        app.post('/checklogin', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if(userClient && request.body.username !== "admin") {//if is not undefined
                if (await userClient.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({secret: 'colletta',resave: false, saveUninitialized: true}));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/");
                }
                else {
                    response.redirect("/?mess=invalidLogin");
                }
            }
        });
        app.get('/registration', async (request: any, response: any) => {
            session.errUsername = request.query.mess === "errUsername";
            this.view.setTitle("Registrati");
            response.send(await this.view.getPage());
        });

        app.post("/saveuser", async (req:any,res:any) => {
            const hashedPassword = this.passwordHash.hashSync(req.body.username,10);
            //console.log("hashedPassword:" + hashedPassword);
            let userClient = this.client.getUserClient();
            console.log("username :"+req.body.username+" role: "+ req.body.role+" user : "+userClient );
            if(userClient !== undefined){
                const exist = await userClient.search(req.body.username);
                if (req.body.username !== "admin" && req.body.role === "student" && exist === "false") {
                    userClient.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.email);
                    console.log("studente registrato con successo");
                    res.redirect("/");

                } else if (req.body.username !== "admin" && req.body.role === "teacher" && userClient !== undefined) {
                    userClient.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.inps, req.body.email);
                    console.log("teacher registrato con successo");
                    res.redirect("/");
                } else {
                    console.log("username già utilizzato");
                    res.redirect("/registration?mess=errUsername");
                }
            }
        });
    }
    isUsernameInvalid() : boolean {
        return  session.errUsername;
    }
}
export {AuthenticationPresenter};

