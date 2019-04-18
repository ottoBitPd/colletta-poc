import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

var session = require('express-session');

class SearchPresenter extends PagePresenter {
    private searchType : any;
    private results : any;
    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildExerciseClient().buildUserClient().build();
    }
    private setSearchType(value : string){
        //this.setResults(undefined);
        this.searchType=value;
    }
    public getSearchType(){
        return this.searchType;
    }
    update(app: any) {
        this.exerciseSearchPage(app);
        this.searchExercise(app);
        this.studentSearchPage(app);
        this.searchStudent(app);
        this.classExerciseSearchPage(app);
    }
    private exerciseSearchPage(app : any){
        app.get('/exercise/search', async (request: any, response: any) => {
            //console.log("sentence: ",request.body.sentence);
            if(request.query.s === undefined){
                this.setResults([]);
            }
            session.invalidLogin = request.query.mess==="invalidLogin";
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            };

            this.setSearchType("exercise");
            this.view.setTitle("Ricerca esercizio");
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(await this.view.getPage());
        });
    }
    private searchExercise(app : any) {
        app.post('/searchexercise', async (request: any, response: any) => {
            //console.log("frase da cercare : "+request.body.sentence);
            let exerciseClient = this.client.getExerciseClient();
            if(exerciseClient) {
                let map = await exerciseClient.searchExercise(request.body.sentence);//returns map<idEsercizio, sentence>
                this.setResults(map);
                if(this.searchType==="exercise")
                    response.redirect("/exercise/search?s="+encodeURIComponent(request.body.sentence));
                if(this.searchType==="classExercise")
                    response.redirect(307,"/class/exercise/search?s="+encodeURIComponent(request.body.sentence));
            }
            else{
                this.setResults(new Map());
                if(this.searchType==="exercise")
                    response.redirect("/exercise/search");
                if(this.searchType==="classExercise")
                    response.redirect(307,"/class/exercise/search?s="+encodeURIComponent(request.body.sentence));
            }
        });
    }
    private studentSearchPage(app: any) {
        app.post('/student/insert', async (request: any, response: any) => {
            if(request.query.s === undefined){
                this.setResults([]);
            }
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            };

            this.setSearchType("student");
            this.view.setTitle("Ricerca studente");
            this.view.setMenuList(menuList);
            response.send(await this.view.getPage());
        });
    }

    private searchStudent(app: any) {
        app.post('/searchstudent', async (request: any, response: any) => {
            //console.log("frase da cercare : "+request.body.sentence);
            let userClient = this.client.getUserClient();
            if(userClient) {
                let map = await userClient.searchUser(request.body.sentence, false);//returns map<idEsercizio, sentence>
                this.setResults(map);
                response.redirect(307,"/student/insert?s="+encodeURIComponent(request.body.sentence));
            }
            else{
                this.setResults(new Map());
                response.redirect(307,"/student/insert?s="+encodeURIComponent(request.body.sentence));
            }
        });
    }

    private setResults(map: any) {
        this.results=map;
    }
    public getResults() {
        return this.results;
    }

    private classExerciseSearchPage(app: any) {
        app.post('/class/exercise/search', async (request: any, response: any) => {
            if(request.query.s === undefined){
                this.setResults([]);
            }
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }
            this.setSearchType("classExercise");
            /* this.view.setTitle("Ricerca studente");*/
            this.view.setMenuList(menuList);
            response.send(await this.view.getPage());
        });
    }
}
export {SearchPresenter};