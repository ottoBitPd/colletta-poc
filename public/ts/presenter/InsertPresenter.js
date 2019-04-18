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
class InsertPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildExerciseClient().buildUserClient().build();
    }
    update(app) {
        this.insertExercise(app);
    }
    insertExercise(app) {
        app.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
            session.invalidLogin = request.query.mess === "invalidLogin";
            let exerciseClient = this.client.getExerciseClient();
            let userClient = this.client.getUserClient();
            if (exerciseClient && userClient) {
                //console.log("session.username: ", session.username);
                if (session.username !== undefined && (yield userClient.isTeacher(session.username))) {
                    //loggato come insegnante
                }
                else if (session.username !== undefined && !(yield userClient.isTeacher(session.username))) {
                    //loggato come studente
                }
                else {
                    //non loggato
                }
            }
            let menuList;
            menuList = {
                0: { "link": "/exercise/search", "name": "Ricerca esercizio" }
            };
            this.view.setTitle("Homepage");
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(yield this.view.getPage());
        }));
    }
}
exports.InsertPresenter = InsertPresenter;
//# sourceMappingURL=InsertPresenter.js.map