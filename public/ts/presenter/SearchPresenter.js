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
class SearchPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildExerciseClient().buildUserClient().build();
    }
    setSearchType(value) {
        //this.setResults(undefined);
        this.searchType = value;
    }
    getSearchType() {
        return this.searchType;
    }
    update(app) {
        this.exerciseSearchPage(app);
        this.searchExercise(app);
        this.studentSearchPage(app);
        this.searchStudent(app);
        this.classExerciseSearchPage(app);
    }
    exerciseSearchPage(app) {
        app.get('/exercise/search', (request, response) => __awaiter(this, void 0, void 0, function* () {
            //console.log("sentence: ",request.body.sentence);
            if (request.query.s === undefined) {
                this.setResults([]);
            }
            session.invalidLogin = request.query.mess === "invalidLogin";
            let menuList;
            menuList = {
                0: { "link": "/", "name": "Homepage" }
            };
            this.setSearchType("exercise");
            this.view.setTitle("Ricerca esercizio");
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(yield this.view.getPage());
        }));
    }
    searchExercise(app) {
        app.post('/searchexercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            //console.log("frase da cercare : "+request.body.sentence);
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                let map = yield exerciseClient.searchExercise(request.body.sentence); //returns map<idEsercizio, sentence>
                this.setResults(map);
                if (this.searchType === "exercise")
                    response.redirect("/exercise/search?s=" + encodeURIComponent(request.body.sentence));
                if (this.searchType === "classExercise")
                    response.redirect(307, "/class/exercise/search?s=" + encodeURIComponent(request.body.sentence));
            }
            else {
                this.setResults(new Map());
                if (this.searchType === "exercise")
                    response.redirect("/exercise/search");
                if (this.searchType === "classExercise")
                    response.redirect(307, "/class/exercise/search?s=" + encodeURIComponent(request.body.sentence));
            }
        }));
    }
    studentSearchPage(app) {
        app.post('/student/insert', (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.query.s === undefined) {
                this.setResults([]);
            }
            let menuList;
            menuList = {
                0: { "link": "/", "name": "Homepage" }
            };
            this.setSearchType("student");
            this.view.setTitle("Ricerca studente");
            this.view.setMenuList(menuList);
            response.send(yield this.view.getPage());
        }));
    }
    searchStudent(app) {
        app.post('/searchstudent', (request, response) => __awaiter(this, void 0, void 0, function* () {
            //console.log("frase da cercare : "+request.body.sentence);
            let userClient = this.client.getUserClient();
            if (userClient) {
                let map = yield userClient.searchUser(request.body.sentence, false); //returns map<idEsercizio, sentence>
                this.setResults(map);
                response.redirect(307, "/student/insert?s=" + encodeURIComponent(request.body.sentence));
            }
            else {
                this.setResults(new Map());
                response.redirect(307, "/student/insert?s=" + encodeURIComponent(request.body.sentence));
            }
        }));
    }
    setResults(map) {
        this.results = map;
    }
    getResults() {
        return this.results;
    }
    classExerciseSearchPage(app) {
        app.post('/class/exercise/search', (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.query.s === undefined) {
                this.setResults([]);
            }
            let menuList;
            menuList = {
                0: { "link": "/", "name": "Homepage" }
            };
            this.setSearchType("classExercise");
            /* this.view.setTitle("Ricerca studente");*/
            this.view.setMenuList(menuList);
            response.send(yield this.view.getPage());
        }));
    }
}
exports.SearchPresenter = SearchPresenter;
//# sourceMappingURL=SearchPresenter.js.map