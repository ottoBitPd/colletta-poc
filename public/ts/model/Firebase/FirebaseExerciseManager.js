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
const FirebaseManager_1 = require("./FirebaseManager");
const Exercise_1 = require("../Data/Exercise");
class FirebaseExerciseManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseExerciseManager", this);
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise = obj;
            let exists = yield this.search(exercise.getSentence());
            let wrsolution = exercise.getNewSolution();
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    //scrivo esercizio
                    if (exists === "false" && wrsolution !== null) { //exercise does not exist in the db
                        console.log("inserting sentence");
                        //key = this.writeSentence(exercise.getSentence(), exercise.getAuthorId());
                        let ref = FirebaseManager_1.FirebaseManager.database.ref('data/sentences/').push({
                            sentence: exercise.getSentence(),
                            authorId: exercise.getAuthorId()
                        });
                        //scrivo soluzione
                        let array = String(ref).split("/");
                        let sentenceKey = array[array.length - 1];
                        FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/').push({
                            "solverId": wrsolution.getSolverId(),
                            "tags": wrsolution.getSolutionTags(),
                            "topics": wrsolution.getTopics(),
                            "difficulty": wrsolution.getDifficulty(),
                            "valutations": wrsolution.JSONValutations(),
                            "time": Date.now()
                        });
                        resolve(true);
                    }
                    else if (exists !== "false" && wrsolution !== null) {
                        FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + exists + '/solutions/').push({
                            "solverId": wrsolution.getSolverId(),
                            "tags": wrsolution.getSolutionTags(),
                            "topics": wrsolution.getTopics(),
                            "difficulty": wrsolution.getDifficulty(),
                            "valutations": wrsolution.JSONValutations(),
                            "time": Date.now()
                        });
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            });
        });
    }
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    search(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/sentences/').orderByChild('sentence')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if (data.val().sentence.toLowerCase() === sentence.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve("false");
                    }
                    //console.log("database vuoto");
                    return resolve("false");
                });
            });
        });
    }
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new Map();
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/sentences')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            container.set(data.key, data.val().sentence);
                        });
                        //console.log("non esiste");
                        return resolve(container);
                    }
                    //console.log("database vuoto");
                    else {
                        return resolve(container);
                    }
                });
            });
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getExerciseById(id);
            const read = yield ProData;
            return read;
        });
    }
    getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/sentences/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        let readData = snapshot.val();
                        let exercise = new Exercise_1.Exercise(readData.sentence, readData.authorID);
                        exercise.setKey(id);
                        for (let sol in readData.solutions) {
                            let vals = new Map();
                            for (let val in readData.solutions[sol].valutations) {
                                vals.set(val, readData.solutions[sol].valutations[val]);
                            }
                            //console.log("solutionKey: ",sol);
                            exercise.addSolution(sol, readData.solutions[sol].solverId, readData.solutions[sol].tags, readData.solutions[sol].topics, readData.solutions[sol].difficulty, vals, readData.solutions[sol].time);
                        }
                        return resolve(exercise);
                    }
                    return resolve(undefined);
                });
            });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.removeFromId(id);
            const removed = yield ProData;
            return removed;
        });
    }
    removeFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref("data/sentences/" + id);
            // @ts-ignore
            return new Promise(function (resolve) {
                ref.once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        ref.remove();
                        // @ts-ignore
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let splittedPath = path.split("/");
            let position = splittedPath.length - 1;
            let field = splittedPath[position];
            console.log(field);
            switch (field) {
                case "difficulty":
                    yield this.updateField(path, value);
                    break;
                case "tags":
                    yield this.updateField(path, value);
                    break;
                case "topics":
                    yield this.updateField(path, value);
                    break;
                default:
                    yield console.log("field doesn't exists");
                    return;
            }
            yield this.updateTime(path);
        });
    }
    updateField(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref(path);
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(value);
                }
            });
        });
    }
    updateTime(path) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let ref = FirebaseManager_1.FirebaseManager.database.ref(path).parent.child("time");
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(Date.now());
                }
            });
        });
    }
}
exports.FirebaseExerciseManager = FirebaseExerciseManager;
//# sourceMappingURL=FirebaseExerciseManager.js.map