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
class ProfilePresenter extends PagePresenter_1.PagePresenter {
    //private classClient : ClassClient | undefined;
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildUserClient().build();
    }
    update(app) {
        app.post('/update', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                let check = false;
                if (request.body.oldpassword === "" && request.body.password === "") {
                    console.log("pwd non cambia");
                    check = true;
                }
                if (request.body.oldpassword !== "" && request.body.password !== "") {
                    if (userClient.checkPassword(request.body.oldpassword, userData.password)) {
                        console.log("nuova password: " + request.body.password);
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
                if (check === true && request.body.username === "") {
                    console.log("username non cambia");
                    check = true;
                }
                else {
                    if (check === true && (yield userClient.search(request.body.username)) === "false") {
                        console.log("username cambia e ok");
                        check = true;
                    }
                    else {
                        console.log("username esistente o password errata");
                        check = false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if (check) {
                    this.view.setError("");
                    let userUpdateData = {};
                    console.log("POST: ", request.body);
                    for (let i in request.body) {
                        if (i !== "oldpassword" && i !== "inps") {
                            if (request.body[i] !== "") {
                                console.log('cambio');
                                userUpdateData[i] = request.body[i];
                            }
                            else
                                userUpdateData[i] = userData[i];
                        }
                    }
                    console.log("POST: ", userUpdateData);
                    if (yield userClient.isTeacher(session.username)) {
                        //console.log("teacher");
                        if (/^[^\s]$/.test(request.body.inps))
                            userUpdateData.inps = request.body.inps;
                        else
                            userUpdateData.inps = userData.inps;
                        this.view.setUserKind(PageView_1.UserKind.teacher);
                    }
                    else {
                        //console.log("student");
                        this.view.setUserKind(PageView_1.UserKind.student);
                    }
                    yield userClient.updateUser(session.username, userUpdateData);
                    session.username = userUpdateData.username;
                }
            }
            response.redirect('/profile');
        }));
        app.get('/profile', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                //console.log("userData: ",userData);
                this.view.setUserData(userData);
                if (yield userClient.isTeacher(session.username)) {
                    //console.log("teacher");
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    //console.log("student");
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            }
            this.view.setTitle("Profilo");
            response.send(yield this.view.getPage());
        }));
    }
    getStudentClass() {
        return __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                console.log("userData: ", userData.classId);
                return userData.classId;
            }
        });
    }
}
exports.ProfilePresenter = ProfilePresenter;
//# sourceMappingURL=ProfilePresenter.js.map