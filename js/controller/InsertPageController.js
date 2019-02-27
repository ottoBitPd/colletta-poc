const PageController = require("./PageController.js");
/**
 * InsertPageController is a class that represents the controller for the insert page
 */
class InsertPageController extends PageController{
    /**
     * InsertPageController constructor initializes all attributes needed to InsertPageController object.
     */
    constructor(view){
        super(view);
    }

    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    update(app){
        app.get('/insert', (request, response) => {
            response.send(this.view.getPage());
        });
    }
}
module.exports = InsertPageController;