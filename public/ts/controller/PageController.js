"use strict";
//import {PageView} from "../view/PageView";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../model/Client");
class PageController {
    constructor(view) {
        this.view = view;
        this.client = (new Client_1.Client.builder()).build();
    }
}
exports.PageController = PageController;
//# sourceMappingURL=PagePresenter.js.map