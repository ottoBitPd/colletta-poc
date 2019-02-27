const PageView = require("./PageView.js");

class SavePageView extends PageView{
    constructor(){
        super();
    }

    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }

}
module.exports = SavePageView;