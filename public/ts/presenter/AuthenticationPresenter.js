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
const session = require('express-session');
class AuthenticationPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.passwordHash = require('bcryptjs');
        this.client = (new Client_1.Client.builder()).buildUserClient().build();
    }
    update(app) {
        app.get('/logout', (request, response) => {
            console.log("LOGOUT");
            //TODO trovarle e cancellarle tutte
            delete session.invalidLogin;
            delete session.errUsername;
            delete session.username;
            delete session.password;
            response.redirect('/');
        });
        app.get('/profile', (request, response) => {
            response.send("Login avvenuto con successo sei nel tuo profilo" + session.username);
        });
        app.get('/login', (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.query.mess === "invalidLogin") {
                this.view.setError("username o password invalidi");
            }
            else {
                this.view.setError("");
            }
            response.send(yield this.view.getPage());
        }));
        app.post('/checklogin', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient && request.body.username !== "admin") { //if is not undefined
                if (yield userClient.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({ secret: 'colletta', resave: false, saveUninitialized: true }));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/");
                }
                else {
                    response.redirect("/?mess=invalidLogin");
                }
            }
        }));
        app.get('/registration', (request, response) => __awaiter(this, void 0, void 0, function* () {
            session.errUsername = request.query.mess === "errUsername";
            this.view.setTitle("Registrati");
            response.send(yield this.view.getPage());
        }));
        app.post("/saveuser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = this.passwordHash.hashSync(req.body.username, 10);
            //console.log("hashedPassword:" + hashedPassword);
            let userClient = this.client.getUserClient();
            console.log("username :" + req.body.username + " role: " + req.body.role + " user : " + userClient);
            if (userClient !== undefined) {
                const exist = yield userClient.search(req.body.username);
                if (req.body.username !== "admin" && req.body.role === "student" && exist === "false") {
                    userClient.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.email);
                    console.log("studente registrato con successo");
                    res.redirect("/");
                }
                else if (req.body.username !== "admin" && req.body.role === "teacher" && userClient !== undefined) {
                    userClient.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.inps, req.body.email);
                    console.log("teacher registrato con successo");
                    res.redirect("/");
                }
                else {
                    console.log("username già utilizzato");
                    res.redirect("/registration?mess=errUsername");
                }
            }
        }));
    }
    isUsernameInvalid() {
        return session.errUsername;
    }
}
exports.AuthenticationPresenter = AuthenticationPresenter;
//# sourceMappingURL=AuthenticationPresenter.js.map