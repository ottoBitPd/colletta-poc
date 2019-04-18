"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class ExercisePageView extends PageView_1.PageView {
    constructor() {
        super();
        this.sentence = null;
        this.key = null;
        this.hunposTranslation = null;
        this.hunposTags = null;
    }
    setSentence(value) {
        this.sentence = value;
    }
    setKey(value) {
        this.key = value;
    }
    setHunposTranslation(value) {
        this.hunposTranslation = value;
    }
    setHunposTags(value) {
        this.hunposTags = value;
    }
    getPage() {
        let data = this.fileSystem.readFileSync('./public/exercise.html').toString();
        const words = this.sentence.split(" ");
        data = data.replace(/\*table\*/g, this.buildForm(words));
        data = data.replace(/\*script\*/g, this.getScript());
        data = data.replace(/\*css\*/g, this.buildCss(words));
        data = data.replace(/\*wordsnumber\*/g, words.length);
        data = data.replace(/\*sentence\*/g, this.sentence);
        data = data.replace(/\*key\*/g, this.key);
        data = data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
        return data;
    }
    buildForm(words) {
        let table = "";
        for (let i = 0; i < words.length; i++) {
            table += "<li class='first'>" + words[i] + "</li><li class='second'>" + this.hunposTranslation[i] + "</li><li class='third'>" + this.getSelect(i) + "</li>\n";
        }
        return table;
    }
    buildCss(words) {
        let css = "";
        for (let i = 0; i < words.length; i++) {
            css += this.getCss(i);
        }
        return css;
    }
    getSelect(index) {
        const input = this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g, index);
    }
    getScript() {
        return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
    }
    getCss(index) {
        const input = this.fileSystem.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g, index);
    }
}
exports.ExercisePageView = ExercisePageView;
//# sourceMappingURL=ExercisePageView.js.map