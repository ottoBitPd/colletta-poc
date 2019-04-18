"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that provides the hunpos service to the application
 */
class HunposAdapter {
    /**
     * HunposAdapter constructor initializes all attributes needed to HunposAdapter object.
     */
    constructor() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train src\\ts\\presenter\\hunpos\\italian_model < src\\ts\\presenter\\hunpos\\train');
    }
    /**
     * This method provide the hunpos solution for a sentence passed as parameter
     * @param sentence - the sentence to correct
     * @returns {json} json object containing the hunpos solution for the sentence
     */
    getHunposSolution(sentence) {
        this.buildInputFile(sentence);
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag src\\ts\\presenter\\hunpos\\italian_model < src\\ts\\presenter\\hunpos\\input.txt > src\\ts\\presenter\\hunpos\\output.txt');
        return this.buildSolution();
    }
    buildInputFile(sentence) {
        var words = sentence.split(" ");
        for (let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync('./src/ts/presenter/hunpos/input.txt', words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    buildSolution() {
        let wordSolArray = this.fileSystem.readFileSync('./src/ts/presenter/hunpos/output.txt').toString().split("\n");
        let obj = {
            sentence: []
        };
        let i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        this.fileSystem.writeFileSync('./src/ts/presenter/hunpos/input.txt', "");
        return obj;
    }
}
exports.HunposAdapter = HunposAdapter;
//# sourceMappingURL=HunposAdapter.js.map