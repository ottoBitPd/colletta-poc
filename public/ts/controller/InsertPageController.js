"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
/**
 * InsertPagePresenter is a class that represents the presenter for the insert page
 */
class InsertPageController extends PageController_1.PageController {
    /**
     * InsertPagePresenter constructor initializes all attributes needed to InsertPagePresenter object.
     */
    constructor(view) {
        super(view);
    }
    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    update(app) {
        app.get('/insert', (request, response) => {
            response.send(this.view.getPage());
        });
    }
}
exports.InsertPageController = InsertPageController;
//# sourceMappingURL=InsertPagePresenter.js.map