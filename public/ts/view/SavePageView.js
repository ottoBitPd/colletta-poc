"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class SavePageView extends PageView_1.PageView {
    constructor() {
        super();
    }
    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }
}
exports.SavePageView = SavePageView;
//# sourceMappingURL=SaveView.js.map