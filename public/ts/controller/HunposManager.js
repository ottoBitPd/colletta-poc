"use strict";
///<reference path="POSManager.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var HunposManager = /** @class */ (function () {
    function HunposManager() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        this.train();
        this.inputFilePath = './js/presenter/hunpos/input.txt';
        this.outputFilePath = './js/presenter/hunpos/output.txt';
    }
    HunposManager.prototype.setModel = function (modelFilePath) {
        this.modelFilePath = modelFilePath;
    };
    ;
    HunposManager.prototype.buildInputFile = function (sentence) {
        var words = sentence.split(" ");
        for (var i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n", function (err) {
                if (err)
                    throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    };
    ;
    HunposManager.prototype.buildSolution = function () {
        var wordSolArray = this.fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        var obj = {
            sentence: []
        };
        var i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        this.fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    };
    ;
    HunposManager.prototype.getSolution = function (modelFilePath) {
        this.buildInputFile(modelFilePath);
        this.tag();
        return this.buildSolution();
    };
    ;
    HunposManager.prototype.train = function () {
        this.shell.exec('./js/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./js/presenter/hunpos/train');
    };
    ;
    HunposManager.prototype.tag = function () {
        this.shell.exec('./js/presenter/hunpos/hunpos-tag ' + this.modelFilePath + ' < ' + this.inputFilePath + '>' + this.outputFilePath);
    };
    ;
    return HunposManager;
}());
exports.HunposManager = HunposManager;
