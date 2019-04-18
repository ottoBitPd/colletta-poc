import {PageView} from "./PageView";

class SaveView extends PageView{
    private fileSystem : any;
    constructor(app : any){
        super();
        this.fileSystem=require('fs');
    }

    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }

}
export {SaveView};