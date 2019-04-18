"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class SaveView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.fileSystem = require('fs');
    }
    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }
}
exports.SaveView = SaveView;
//# sourceMappingURL=SaveView.js.map