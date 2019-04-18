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
const PageController_1 = require("./PageController");
const Client_1 = require("../model/Client");
//import {Client} from "../model/Client";
//import {ClassClient} from "../model/ClassClient";
var session = require('express-session');
class ProfileController extends PageController_1.PageController {
    constructor(view) {
        super(view);
        //private classClient : ClassClient | undefined;
        this.passwordHash = require('bcryptjs');
        this.client = (new Client_1.Client.builder()).buildUserClient().build();
    }
    update(app) {
        //autenticazione
        app.get('/logout', (request, response) => {
            //TODO trovarle e cancellarle tutte
            delete session.invalidLogin;
            delete session.errUsername;
            delete session.username;
            delete session.password;
            response.redirect('/profile');
        });
        app.get('/profile', (request, response) => {
            session.invalidLogin = request.query.mess === "invalidLogin";
            //this.view.setMainList("Login avvenuto con successo sei nel tuo profilo"+session.username);
            let menuList;
            if (session.role === "teacher") {
                menuList = {
                    0: { "link": "/insert", "a": "name1" },
                    1: { "link": "link2", "name": "name2" },
                    2: { "link": "link3", "name": "name3" }
                };
            }
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(this.view.getPage());
        });
        app.post('/checklogin', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient && request.body.username !== "admin") { //if is not undefined
                if (yield userClient.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({ secret: 'colletta', resave: false, saveUninitialized: true }));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/profile");
                }
                else {
                    response.redirect("/profile?mess=invalidLogin");
                }
            }
        }));
        app.get('/registration', (request, response) => {
            session.errUsername = request.query.mess === "invalidLogin";
            response.send(this.view.getPage());
        });
        app.post("/saveuser", (req, res) => {
            const hashedPassword = this.passwordHash.hashSync(req.body.username, 10);
            //console.log("hashedPassword:" + hashedPassword);
            let userClient = this.client.getUserClient();
            console.log("username :" + req.body.username + " role: " + req.body.role + " user : " + userClient);
            if (req.body.username !== "admin" && req.body.role === "student" && userClient !== undefined) {
                userClient.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola");
                console.log("studente registrato con successo");
                res.redirect("/profile");
            }
            else if (req.body.username !== "admin" && req.body.role === "teacher" && userClient !== undefined) {
                userClient.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", "0002");
                console.log("teacher registrato con successo");
                res.redirect("/profile");
            }
            else {
                console.log("tutto a puttane");
                res.redirect("/registration?mess=errUsername");
            }
        });
        app.post('/deleteClass', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log("post: ", request.body);
            response.send("elimino la classe " + request.body.classToDelete);
        }));
    }
    /**
     * method used by the View to understand if ther is any user logged in
     */
    isLoggedIn() {
        return session.username !== undefined;
    }
    /**
     * method used by the View to understand if the login is valid
     */
    isLoginInvalid() {
        return session.invalidLogin;
    }
    isUsernameInvalid() {
        return session.errUsername;
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfilePresenter.js.map