"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HunposManager_1 = require("../POSManager/HunposManager");
const Solution_1 = require("./Solution");
class Exercise {
    constructor(sentence, authorId) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
        this.hunpos = new HunposManager_1.HunposManager();
    }
    getKey() {
        return this.key;
    }
    getSentence() {
        return this.sentence;
    }
    getPOSManager() {
        return this.hunpos;
    }
    getAuthorId() {
        return this.authorId;
    }
    setKey(key) {
        this.key = key;
    }
    setSentence(sentence) {
        this.sentence = sentence;
    }
    setSolution(solverId, solutionTags, topics, difficulty) {
        this.newSolution = new Solution_1.Solution(undefined, solverId, solutionTags, topics, difficulty);
    }
    addSolution(key, solverId, solutionTags, topics, difficulty, valutations, time) {
        this.solutions.push(new Solution_1.Solution(key, solverId, solutionTags, topics, difficulty, valutations, time));
    }
    getSolutions() {
        return this.solutions;
    }
    addValutation(teacherID, mark) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID, mark);
        else
            throw new Error("Nessuna soluzione proposta");
    }
    getNewSolution() {
        return this.newSolution;
    }
    autosolve() {
        return this.getPOSManager().getSolution(this.getSentence());
    }
    ;
    getSplitSentence() {
        //TODO splittare anche punteggiatura ma no apostrofo
        //creare un espressione regolare ed usarla per inserire uno spazio prima dei simboli e di punteggiatura dopo
        //gli apostrofi,
        //poi splittare in base allo spazio.
        return this.sentence.split(" ");
    }
    //da un voto alla soluzione corrente(newSolution) rispetto a solution con quel teacherID
    evaluate(teacherID) {
        if (this.newSolution === null) {
            return -1;
        }
        else {
            let tags = [];
            if (teacherID !== undefined) {
                const teacherSolution = this.solutions.find(function (element) {
                    return element.getSolverId() === teacherID;
                });
                if (teacherSolution === undefined) {
                    throw new Error("ID non trovato");
                }
                else {
                    tags = teacherSolution.getSolutionTags();
                }
            }
            else {
                const hunposSolution = this.autosolve();
                for (let i in hunposSolution.sentence) {
                    tags.push(hunposSolution.sentence[i].label);
                }
            }
            return this.newSolution.evaluateSolution(tags);
        }
    }
    toJSON() {
        //Do I have to add solutions too? - Perry15
        let exercise = {
            "sentence": this.sentence,
            "authorId": this.authorId,
            "key": this.key
        };
        return exercise;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map