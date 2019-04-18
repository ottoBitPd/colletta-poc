"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["veryeasy"] = 1] = "veryeasy";
    Difficulty[Difficulty["easy"] = 2] = "easy";
    Difficulty[Difficulty["normal"] = 3] = "normal";
    Difficulty[Difficulty["hard"] = 4] = "hard";
    Difficulty[Difficulty["veryhard"] = 5] = "veryhard";
})(Difficulty || (Difficulty = {}));
class Solution {
    // @ts-ignore
    constructor(key, solverId, solutionTags, topics, difficulty, valutations, time) {
        this.key = key || null;
        this.solverId = solverId;
        this.solutionTags = solutionTags;
        this.topics = topics || null;
        this.difficulty = difficulty || null;
        this.valutations = valutations || null;
        this.time = time || null;
    }
    /*constructor() {
        this.solverId = "-1";
        this.solutionTags = [];
        this.correctionTags = [];
        this.teacherId = "-1";
        this.topics = [];
        this.difficulty = 1;
    }*/
    getKey() {
        return this.key;
    }
    getSolverId() {
        return this.solverId;
    }
    getTopics() {
        return this.topics;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getSolutionTags() {
        return this.solutionTags;
    }
    getValutations() {
        return this.valutations;
    }
    JSONValutations() {
        let result = "{";
        if (this.valutations) {
            this.valutations.forEach((value, key) => {
                result += '"' + key + '" : ' + value + ",";
            });
        }
        if (result !== "{")
            result = result.substr(0, result.length - 1);
        result += "}";
        return JSON.parse(result);
    }
    getTime() {
        return this.time;
    }
    addNewMark(teacherID, mark) {
        if (!this.valutations)
            this.valutations = new Map();
        this.valutations.set(teacherID, mark);
    }
    evaluateSolution(tags) {
        var rightTagsNumber = 0;
        let mySolutionTags = this.getSolutionTags();
        for (let j = 0; j < mySolutionTags.length; j++) {
            if (mySolutionTags[j] === tags[j]) {
                rightTagsNumber++;
            }
        }
        return ((rightTagsNumber * 10) / mySolutionTags.length);
    }
}
exports.Solution = Solution;
//# sourceMappingURL=Solution.js.map