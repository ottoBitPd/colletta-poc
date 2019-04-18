"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
//import {ExercisePageView} from "../view/ExercisePageView";
//import {Exercise} from "../model/Exercise";
const ItalianExercise_1 = require("../model/ItalianExercise");
//import {HunposManager} from "../model/HunposManager";
class ExercisePageController extends PageController_1.PageController {
    constructor(view, model) {
        super(view);
        this.model = model;
        //this.exercise = new ItalianExercise(1,"1");
        //this.hunpos = new HunposManager();
        //declare function require(name:string);
        this.fileSystem = require('fs');
    }
    update(app) {
        app.post('/exercise', (request, response) => {
            //checking if the exercise sentence already exists in the database
            var key = this.model.checkIfExists(request.body.sentence);
            /*if(key>=0)
                this.exercise.setKey(key);
            else
                this.exercise.setKey(this.model.writeSentence(this.exercise.getSentence()));*/
            if (key === -1) {
                key = this.model.writeSentence(request.body.sentence);
            }
            this.exercise = new ItalianExercise_1.ItalianExercise(key, request.body.sentence);
            //sending the sentence to hunpos which will provide a solution
            var hunposSolution = this.exercise.autosolve();
            //creation of the array containing tags provided from hunpos solution
            var hunposTags = this.extractTags(hunposSolution);
            //converting tags to italian
            var hunposTranslation = this.translateTags(hunposTags);
            //console.log("view: "+JSON.stringify(this.view));
            this.view.setSentence(this.exercise.getSentence());
            this.view.setKey(this.exercise.getKey());
            this.view.setPosTranslation(hunposTranslation);
            this.view.setPosTags(hunposTags);
            response.send(this.view.getPage());
        });
    }
    extractTags(objSolution) {
        let tags = [];
        for (let i in objSolution.sentence) {
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    }
    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    translateTags(tags) {
        var hunposTranslation = [];
        for (var i = 0; i < tags.length; i++) {
            hunposTranslation[i] = this.translateTag(tags[i]);
        }
        return hunposTranslation;
    }
    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    translateTag(tag) {
        var content = this.fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");
        var jsonContent = JSON.parse(content);
        var lowercase = tag.split(/[A-Z]{1,2}/);
        var uppercase = tag.split(/[a-z0-9]+/);
        var result = "";
        //console.log("uppercase[0]: "+uppercase[0]);
        if (uppercase[0] !== 'V' && uppercase[0] !== 'PE' && uppercase[0] !== 'PC') {
            for (var i in jsonContent) {
                if (i === uppercase[0]) {
                    result += jsonContent[i];
                }
                if (lowercase[1]) {
                    if (i === lowercase[1]) {
                        result += " ";
                        result += jsonContent[i];
                    }
                }
            }
            return result;
        }
        for (var x in jsonContent) {
            if (x === tag) {
                result += jsonContent[x];
            }
        }
        return result;
    }
}
exports.ExercisePageController = ExercisePageController;
//# sourceMappingURL=ExercisePresenter.js.map