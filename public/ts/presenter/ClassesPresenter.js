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
var session = require('express-session');
class ClassesPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildClassClient().buildUserClient().build();
    }
    update(app) {
        this.classes(app);
        this.insertClass(app);
        this.deleteClass(app);
    }
    classes(app) {
        app.get('/classes', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let menuList;
            menuList = {
                0: { "link": "/", "name": "Homepage" }
            };
            this.view.setMenuList(menuList);
            this.view.setTitle("Le tue classi");
            response.send(yield this.view.getPage());
        }));
    }
    insertClass(app) {
        app.post('/insertclass', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if (classClient && userClient) {
                let id = yield userClient.search(session.username);
                if (id !== "false") {
                    classClient.addClass(request.body.classname, request.body.description, id);
                }
            }
            response.redirect('/classes');
        }));
    }
    deleteClass(app) {
        app.post('/deleteclass', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let classClient = this.client.getClassClient();
            if (classClient) {
                yield classClient.deleteClass(request.body.key);
                //ritorna boolean per gestione errore
            }
            response.redirect('/classes');
        }));
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
}
exports.ClassesPresenter = ClassesPresenter;
//# sourceMappingURL=ClassesPresenter.js.map