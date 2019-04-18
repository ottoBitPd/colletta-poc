"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exercise {
    constructor() {
        this.sentence = null;
        this.key = null;
    }
    getSentence() {
        return this.sentence;
    }
    getKey() {
        return this.key;
    }
    setKey(key) {
        this.key = key;
    }
    setSentence(sentence) {
        this.sentence = sentence;
    }
    extractTags(objSolution) {
        let tags = [];
        for (let i in objSolution.sentence) {
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map