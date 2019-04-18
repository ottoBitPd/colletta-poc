import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import * as fileSystem from "fs";
import {PageView, UserKind} from "../view/PageView";

var session = require('express-session');

class ExercisePresenter extends PagePresenter{

    private userSolution : string[];
    private correction : any | null;

    constructor(view : PageView){
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();
        this.userSolution=[];
        this.correction=null;
    }

    getUserSolution() : any {
        return this.userSolution;
    }

    getCorrection() : any | null {
        return this.correction;
    }

    update(app : any){
        this.listenExercise(app);
        this.saveExercise(app);
        this.insertExercise(app);
    }

    private insertExercise(app : any) : void {
        app.post('/exercise/insert', async (request: any, response: any) => {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                //sending the sentence to hunpos which will provide a solution
                console.log("primo autosolve");
                var posSolution = await exerciseClient.autosolve(request.body.sentence, "authorIdValue");
                //creation of the array containing tags provided from hunpos solution
                var posTags = this.extractTags(posSolution);
                //converting tags to italian
                var posTranslation = this.translateTags(posTags);
                //console.log("view: "+JSON.stringify(this.view));
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(posTranslation);
                this.view.setPosTags(posTags);
                this.view.setUserKind(UserKind.teacher);
                this.view.setTitle("Esercizio");
                console.log("hunpos: ",posSolution);
                console.log("tags extracted: ",posTags);
                console.log("tags translated: ",posTranslation);

                response.send(await this.view.getPage());
            }
        });
    }

    private listenExercise(app :any) : void {
        app.post('/exercise', async (request: any, response: any) => {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if(exerciseClient){
                // console.log("key arrivata: ",request.body.sentence);
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(null);
                this.view.setCorrections(await this.teacherSolutions(request.body.sentence));
                if(session.username !== undefined){
                    //const sentence = await exerciseClient.getSentence(request.body.sentence);
                    //console.log("niente hunpos, non sei un insegnante");
                    this.view.setUserKind(UserKind.student);
                } else {
                    //not logged
                    this.view.setUserKind(UserKind.user);
                }
                response.send(await this.view.getPage());
            }
        });
    }

    private saveExercise(app : any) : any{
        app.post('/exercise/save', async (request : any, response : any) => {
            let exerciseClient = this.client.getExerciseClient();
            let userClient = this.client.getUserClient();
            if(exerciseClient && userClient){
                let words = exerciseClient.getSplitSentence(request.body.sentence);
                let wordsnumber = words.length;
                if(session.username!== undefined){//if somebody is logged in
                    console.log("passoA");
                    let ID = await userClient.search(session.username);
                    if(this.view.getUserKind() === UserKind.teacher) {
                        console.log("passoA1");
                        //console.log("post: ",request.body);
                        let hunposTags = JSON.parse(request.body.hunposTags);
                        let tagsCorrection = this.correctionToTags(wordsnumber, request.body);
                        //building a array merging tags coming from user corrections and hunpos solution
                        let finalTags = this.correctsPOS(hunposTags, tagsCorrection);
                        //console.log("finalTags: "+finalTags);
                        //const solverId = userClient.getUserId(session.username)
                        let solution = {
                            0: ID,
                            1: finalTags,
                            2: this.splitTopics(request.body.topics),
                            3: request.body.difficulty
                        };
                        let valutation = {
                            0: ID,
                            1: 10
                        };

                        this.userSolution = solution[1];
                        this.correction = null;
                        exerciseClient.insertExercise(request.body.sentence, ID, solution, valutation);
                        //exerciseClient.addValutation(request.body.sentence, "sessionauthorId","teacherIdValue", 10);//valori di prova
                        //await exerciseClient.insertExercise(request.body.sentence, "authorIdValue",);

                        //saving in the database the final solution for the exercise
                        //this.model.writeSolution(sentence.split(" "), finalTags, sentence, key);
                        response.redirect('/');
                    } else {
                        console.log("passoA2");
                        let solution : any;
                        let valutation : any;
                        if (request.body.correction !== 'auto'){
                            console.log("passoAB1");
                            let corrections = await this.teacherSolutions(request.body.sentence);
                            corrections = corrections.filter((value) => value.id === request.body.correction);
                            solution = {
                                0: ID,
                                1: this.correctionToTags(wordsnumber,request.body),
                                2: corrections[0].tags,
                                3: corrections[0].difficulty
                            };
                            valutation = {
                                0: corrections[0].userID,
                                1: await exerciseClient.evaluate(solution["1"],ID,corrections[0].topics,request.body.sentence,corrections[0].difficulty,corrections[0].userID)
                            };
                            if ((await exerciseClient.searchExercise(request.body.sentence)).size > 0){
                                await exerciseClient.insertExercise(request.body.sentence, ID, solution, valutation);
                                this.userSolution = solution[1];
                                this.correction = {"mark" : valutation[1], "tags" : corrections[0].tags};
                            }
                        } else {
                            console.log("passoAB2");
                            solution = {
                                0: ID,
                                1: this.correctionToTags(wordsnumber,request.body),
                                2: [],
                                3: -1
                            };
                            valutation = {
                                0: null,
                                1: await exerciseClient.evaluate(solution["1"],"",[],request.body.sentence,-1)
                            };
                            this.userSolution = solution[1];
                            this.correction = {"mark" : valutation[1], "tags" : await exerciseClient.autosolve(request.body.sentence,ID)};
                        }
                    }
                } else {//if is a no logged in user
                    let solution : any;
                    let valutation : any;
                    if (request.body.correction !== 'auto'){
                        let corrections = await this.teacherSolutions(request.body.sentence);
                        corrections = corrections.filter((value) => value.id === request.body.correction);
                        solution = {
                            0: undefined,
                            1: this.correctionToTags(wordsnumber,request.body),
                            2: corrections[0].tags,
                            3: corrections[0].difficulty
                        };
                        valutation = {
                            0: corrections[0].userID,
                            1: await exerciseClient.evaluate(solution["1"],"",[],request.body.sentence,corrections[0].difficulty,corrections[0].userID)
                        };
                    } else {//if he has chosen autocorrection
                        solution = {
                            0: undefined,
                            1: this.correctionToTags(wordsnumber,request.body),
                            2: [],
                            3: -1
                        };
                        valutation = {
                            0: null,
                            1: await exerciseClient.evaluate(solution["1"],"",[],request.body.sentence,-1)
                        };
                    }

                    this.userSolution = solution[1];
                    console.log("secondo autosolve");
                    this.correction = {"mark" : valutation[1], "tags" : await exerciseClient.autosolve(request.body.sentence,"")};
                    console.log("userSolution: ",this.userSolution);
                    console.log("correction : ",this.correction );
                }
                this.view.setTitle("Risultati");
                response.send(await this.view.getPage());
            }
        });
    }
    private extractTags(objSolution: any) {
        let tags = [];
        for (let i in objSolution) {
            tags.push(objSolution[i]);
        }
        return tags;
    }
    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    private translateTags(tags : string []){
        var hunposTranslation = [];
        for(var i=0;i<tags.length;i++){
            hunposTranslation[i]=this.translateTag(tags[i]);
        }
        return hunposTranslation;
    }

    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    public translateTag(tag : string){
        console.log("arriva: "+tag);
        const content = fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");
        const jsonContent = JSON.parse(content.toString());

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        //console.log("uppercase[0]: "+uppercase[0]);
        if(uppercase[0]!=='V' && uppercase[0]!=='PE' && uppercase[0]!=='PC' && uppercase[0]!=='VA' && uppercase[0]!='VM'){
            for(var i in jsonContent){
                if(i===uppercase[0]){
                    result+=jsonContent[i];
                }
                if(lowercase[1]){
                    if(i===lowercase[1]){
                        result+=" ";
                        result+=jsonContent[i];
                    }
                }
            }
            return result;

        }
        for(var x in jsonContent){
            if(x===tag){
                result+=jsonContent[x];
            }
        }
        return result;
    }

    /**
     * This method merges the hunpos's solution and the user's solution.
     * If the user lets some correction field unsetted means that the hunpos solution,
     * for that word, was correct.
     * @param hunposTags - array that contains the solution tags provided by hunpos
     * @param tagsCorrection - array that contains the solution tags provided by user
     * @returns {Array} a string array containing the tags of the final solution.
     */
    private correctsPOS(posTags : string [] ,tagsCorrection : string []){
        let finalTags : string []=[];
        //console.log("hunpos: "+hunposTags);
        //console.log("user: "+tagsCorrection);
        for(let i in posTags){
            if(tagsCorrection[i]==="")
                finalTags[i]=posTags[i];
            else if(tagsCorrection[i]!==posTags[i])
                finalTags[i]=tagsCorrection[i];
            else
                finalTags[i]=posTags[i];
        }
        //console.log("Final: "+finalTags);
        return finalTags;
    }

    /**
     * This method converts the italian solution, set by the user,
     * to the tags understandable for hunpos.
     * @param wordsnumber - the number of the words in the sentence
     * @param dataCorrection - a json object containing all the corrections suggested by the user
     * @returns {Array} an array containing the tags of the solution suggested by the user
     */
    private correctionToTags(wordsnumber : number, dataCorrection : any) : string []{
        //console.log("dataCorrection: "+require('util').inspect(dataCorrection));
        let optionsIndex=0, wordIndex=0;//optionsIndex counter for options of the first select input field
        let tagsCorrection = [];
        tagsCorrection.length = wordsnumber;
        let actualTag="";
        for(let i in dataCorrection) {
            //avoiding the hidden input field received with the others data correction
            if(i !== 'sentence' && i !== 'wordsnumber' && i!=='key' && i!=='hunposTags'){
                if (dataCorrection[i] !== '-') {//se è stato settato qualcosa
                    //invalid tags or tags that must be set in the second input field
                    /*
                    if(dataCorrection[i]==='A')  {
                        actualTag += "";
                    } else if (['B','E','P','S','V'].indexOf(dataCorrection[i]) !== -1){ //dataCorrection[i] !== 'A' && condition
                        if (i===('general'+ wordIndex))
                            actualTag += "";
                        else
                            actualTag += dataCorrection[i];
                    }
                    else{ //datacorrection[i] !== 'A' && ['B','E','P','S','V'].indexOf(dataCorrection[i]) === -1
                        actualTag += dataCorrection[i];
                    }
                    */

                    //if (dataCorrection[i] !== 'A') {
                        if (['B', 'E', 'P', 'S', 'V','A'].indexOf(dataCorrection[i]) !== -1) {
                            if (i !== ('general' + wordIndex))
                                actualTag += dataCorrection[i];
                        } else {
                            actualTag += dataCorrection[i];
                        }
                    //}

                }

                optionsIndex++;
                if (optionsIndex === 14) {
                    optionsIndex = 0;
                    tagsCorrection[wordIndex]= actualTag;
                    wordIndex++;
                    actualTag = "";
                }
            }
        }
        return tagsCorrection;
    }

    /**
     * This method splits the topics by space and saves it in an array
     * @param topics - a string conattaining the topics
     * @returns {Array} an array containing the topics splitted by space
     */
    private splitTopics(topics : string) : string[]{
        return topics.split(" ");
    }
    /**
     * method used by the View to understand if the login is valid
     */
    async loggedTeacher() : Promise<boolean> {
        let userClient = this.client.getUserClient();
        if(userClient){
            if(session.username !== undefined && await userClient.isTeacher(session.username)) {
                return true;
            }
        }
        return false;
    }

    async loggedStudent() : Promise<boolean> {
        let userClient = this.client.getUserClient();
        if(userClient){
            if(session.username !== undefined && !(await userClient.isTeacher(session.username))) {
                return true;
            }
        }
        return false;
    }

    async teacherSolutions(sentence : string) : Promise<any[]> {
        let result : any[] = [];
        let exerciseClient = this.client.getExerciseClient();
        let userClient = this.client.getUserClient();
        if (userClient){
            let teacherList = await userClient.teacherList();
            for (let teacher of teacherList) {
                if (exerciseClient){
                    let solutions = await exerciseClient.searchSolution(sentence,teacher);
                    for (let sol of solutions){
                        sol = {
                            "id" : sol.id,
                            "userID" : sol.userID,
                            "username" : (await userClient.getUserData(sol.userID)).username,
                            "tags" : sol.tags,
                            "time" : sol.time,
                            "difficulty": sol.difficulty,
                            "topics" : sol.topics
                         };
                        result.push(sol);
                    }
                }
            }
        }
        return result;
    }

    async findSolution(sentence : string, solverID : string, time : number) : Promise<any> {
        let exerciseClient = this.client.getExerciseClient();
        if (exerciseClient){
            let solutions = await exerciseClient.searchSolution(sentence,solverID);
            return solutions.find((sol) => sol.time === time);
        }
        return null;
    }
}
export {ExercisePresenter};