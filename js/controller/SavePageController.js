const PageController = require("./PageController.js");
class SavePageController extends PageController{
    constructor(view, model){
        super(view);
        this.model=model;

    }
    update(app){
        app.post('/saveExercise', (request, response) => {

            var wordsnumber = request.body.wordsnumber;
            var sentence = request.body.sentence;
            var key = request.body.key;
            var hunposTags = JSON.parse(request.body.hunposTags);
            var tagsCorrection = this.correctionToTags(wordsnumber,request.body);

            //building a array merging tags coming from user corrections and hunpos solution
            var finalTags = this.correctsHunpos(hunposTags,tagsCorrection);
            console.log("finalTags: "+finalTags);
            //saving in the database the final solution for the exercise
            this.model.writeSolution(sentence.split(" "), finalTags, sentence, key);
            response.send(this.view.getPage());
        });
    }

    /**
     * This method merges the hunpos's solution and the user's solution.
     * If the user lets some correction field unsetted means that the hunpos solution,
     * for that word, was correct.
     * @param hunposTags - array that contains the solution tags provided by hunpos
     * @param tagsCorrection - array that contains the solution tags provided by user
     * @returns {Array} a string array containing the tags of the final solution.
     */
    correctsHunpos(hunposTags,tagsCorrection){
        var finalTags=[];
        for(var i in hunposTags){
            if(tagsCorrection[i]==="")
                finalTags[i]=hunposTags[i];
            else if(tagsCorrection[i]!==hunposTags[i])
                finalTags[i]=tagsCorrection[i];
            else
                finalTags[i]=hunposTags[i];
        }
        return finalTags;
    }

    /**
     * This method converts the italian solution, set by the user,
     * to the tags understandable for hunpos.
     * @param wordsnumber - the number of the words in the sentence
     * @param dataCorrection - a json object containing all the corrections suggested by the user
     * @returns {Array} an array containing the tags of the solution suggested by the user
     */
    correctionToTags(wordsnumber, dataCorrection){
        var optionsIndex=0, wordIndex=0;//optionsIndex counter for options of the first select input field
        var tagsCorrection = [];
        tagsCorrection.length = wordsnumber;
        var actualTag="";
        for(var i in dataCorrection) {
            //avoiding the hidden input field received with the others data correction
            if(i !== 'sentence' && i !== 'wordsnumber' && i!=='key' && i!=='hunposTags'){
                if (dataCorrection[i] !== '-') {//se è stato settato qualcosa
                    //invalid tags or tags that must be set in the second input field
                    if(dataCorrection[i]==='A' || (dataCorrection[i]==='B' && i===('general'+ wordIndex)) || (dataCorrection[i]==='E' && i===('general'+ wordIndex)) || (dataCorrection[i]==='S' && i===('general'+ wordIndex)) || (dataCorrection[i]==='V' && i===('general'+ wordIndex))) {
                        actualTag += "";
                    }
                    else{
                        actualTag += dataCorrection[i];
                    }
                }

                optionsIndex++;
                if (optionsIndex == 14) {
                    optionsIndex = 0;
                    tagsCorrection[wordIndex]= actualTag;
                    wordIndex++
                    actualTag = "";
                }
            }
        }
        return tagsCorrection;
    }
}
module.exports = SavePageController;