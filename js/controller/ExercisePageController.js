const PageController = require("./PageController.js");
class ExercisePageController extends PageController{
    constructor(view, model){
        super(view);
        this.model=model;
        var Exercise = require('./Exercise.js');
        this.exercise = new Exercise();

        var HunposAdapter = require('./HunposAdapter.js');
        this.hunpos = new HunposAdapter();

        this.fileSystem=require('fs');

    }
    update(app){
        app.post('/exercise', (request, response) => {

            this.exercise.setSentence(request.body.sentence);

            console.log("sentence: "+this.exercise.getSentence());

            //checking if the exercise sentence already exists in the database
            var key= this.model.checkIfExists(this.exercise.getSentence());
            if(key>=0)
                this.exercise.setKey(key);
            else
                this.exercise.setKey(this.model.writeSentence(this.exercise.getSentence()));
            //sending the sentence to hunpos which will provide a solution
            var hunposSolution = this.hunpos.getHunposSolution(this.exercise.getSentence());
            //creation of the array containing tags provided from hunpos solution
            var hunposTags = this.exercise.extractTags(hunposSolution);
            //converting tags to italian
            var hunposTranslation = this.translateTags(hunposTags);
            //console.log("view: "+JSON.stringify(this.view));
            this.view.setSentence(this.exercise.getSentence());
            this.view.setKey(this.exercise.getKey());
            this.view.setHunposTranslation(hunposTranslation);
            this.view.setHunposTags(hunposTags);
            response.send(this.view.getPage());
        });
    }
    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    translateTags(tags){
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
    translateTag(tag){
        var content = this.fileSystem.readFileSync("./js/controller/vocabolario.json");
        var jsonContent = JSON.parse(content);

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        //console.log("uppercase[0]: "+uppercase[0]);
        if(uppercase[0]!=='V' && uppercase[0]!=='PE' && uppercase[0]!=='PC'){
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
}
module.exports = ExercisePageController;