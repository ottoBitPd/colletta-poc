/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
class PageView{
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor(){
        this.fileSystem = require('fs');
    }

    /**
     * Abstract method
     */
    getPage(){
        throw new TypeError("Cannot call abstract method");
    }
}
module.exports = PageView;