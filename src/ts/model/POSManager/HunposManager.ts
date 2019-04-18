//<reference path="POSManager.ts"/>

import {POSManager} from "./POSManager";
import * as fileSystem from "fs";


class HunposManager implements POSManager{
    private modelFilePath:string;
    private inputFilePath:string;
    private outputFilePath:string;

    constructor() {
        //this.train();

        //scommentare per mac/linux
        this.inputFilePath='src/ts/presenter/hunpos/input.txt';
        this.outputFilePath='src/ts/presenter/hunpos/output.txt';
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';
        //scommentare per windows
        /*this.inputFilePath='src\\ts\\presenter\\hunpos\\input.txt';
        this.outputFilePath='src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath='src\\ts\\presenter\\hunpos\\italian_model';*/
    }

    setModel(modelFilePath:string):void{
        this.modelFilePath=modelFilePath;
    };

    private buildInputFile(sentence:string):void{
        var words = sentence.split(" ");
        console.log("words: ",words);
        fileSystem.writeFile(this.inputFilePath,'',() => console.log('done'));
        for(let i = 0; i < words.length; i++) {
            console.log("scrivo: ",words[i]);
            fileSystem.appendFileSync( this.inputFilePath, words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    };

    private buildSolution():any{
        var wordSolArray = fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        console.log("leggo: "+wordSolArray);
        let obj : any= {
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0], label: wordLab[1]});
            i++;
        }
        fileSystem.writeFileSync(this.inputFilePath, "");
        console.log("obj: ",obj);
        fileSystem.close();
        return obj;
    };

    getSolution(sentence:string):any{
        console.log("sentenceHunpos: ",sentence);
        this.buildInputFile(sentence);
        //this.train();
        this.tag();
        return this.buildSolution();
    };

    train():void{
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
    };

    tag():void{
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
    };
}

export {HunposManager};