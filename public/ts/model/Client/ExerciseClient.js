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
const DatabaseExerciseManager_1 = require("../DatabaseManager/DatabaseExerciseManager");
const Exercise_1 = require("../Data/Exercise");
class ExerciseClient {
    constructor() {
        this.dbExerciseManager = new DatabaseExerciseManager_1.DatabaseExerciseManager();
    }
    autosolve(sentence, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("sentence: ", sentence);
            let exercise = new Exercise_1.Exercise(sentence, authorId);
            let autosolution = exercise.autosolve();
            console.log("autosolution: ", autosolution);
            let result = [];
            for (let value of autosolution.sentence) {
                result.push(value.label);
            }
            return result;
        });
    }
    getSplitSentence(sentence) {
        return sentence.split(" ");
    }
    insertExercise(sentence, authorId, solution, valutation) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.setSolution(solution[0], solution[1], solution[2], solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }
    searchExercise(substring) {
        return __awaiter(this, void 0, void 0, function* () {
            var regex = new RegExp(substring, "i");
            var elements = yield this.dbExerciseManager.elements(); //returns a map<id,sentence> of all exercises in the db
            var mapToReturn = new Map();
            elements.forEach(function (value, key) {
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            });
            return mapToReturn;
            /*
            //old version bisogna ritornare una mappa
            var ids:string [] = [];
            var exercises: Exercise [] = [];
            elements.forEach(function (value:string, key:string){
                if(value.search(regex)>=0){
                    ids.push(key);
                }
            });
            for(var i in ids){
                exercises.push(<Exercise>await this.getExercise(ids[i]));
            }
            return exercises;*/
        });
    }
    /*
    //lo usava la vecchia versione di searchExercise
    private async getExercise(id:string):Promise<Data>{
        return await this.dbExerciseManager.read(id);
    }*/
    /**
     * @param sentence
     * @param solverID
     * @return a JSON of this form
     *          {
     *              "id" : solverID,
     *              "tags" : solutionTags,
     *              "time" : solutionTime
     *          }
     */
    searchSolution(sentence, solverID) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            let exerciseKey = yield this.dbExerciseManager.search(sentence);
            //console.log("exerciseKey: ",exerciseKey);
            if (exerciseKey !== "false") {
                let exercise = yield this.dbExerciseManager.read(exerciseKey);
                //console.log("Exercise: ",exercise);
                let solutions = exercise.getSolutions();
                for (let value of solutions) {
                    if (value.getSolverId() === solverID)
                        result.push({
                            "id": value.getKey(),
                            "userID": value.getSolverId(),
                            "tags": value.getSolutionTags(),
                            "time": value.getTime(),
                            "difficulty": value.getDifficulty(),
                            "topics": value.getTopics()
                        });
                }
            }
            return result;
        });
    }
    getSentence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var exercise = yield this.dbExerciseManager.read(id);
            //console.log(exercise);
            return exercise.getSentence();
        });
    }
    evaluate(newSolution, solverID, topics, sentence, difficulty, teacherID) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise;
            if (teacherID !== undefined)
                exercise = (yield this.dbExerciseManager.read(yield this.dbExerciseManager.search(sentence)));
            else
                exercise = new Exercise_1.Exercise(sentence, solverID);
            exercise.setSolution(solverID, newSolution, topics, difficulty);
            return exercise.evaluate(teacherID);
        });
    }
    getExerciseData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield this.dbExerciseManager.read(id);
            let exerciseData = exercise.toJSON();
            return exerciseData;
        });
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map