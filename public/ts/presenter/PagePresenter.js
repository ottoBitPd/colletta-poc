"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../model/Client/Client");
var session = require('express-session');
class PagePresenter {
    constructor(view) {
        this.view = view;
        this.client = (new Client_1.Client.builder()).build();
    }
    /**
     * method used by the View to understand if ther is any user logged in
     */
    isLoggedIn() {
        return session.username !== undefined;
    }
    /**
     * method used by the View to understand if the login is valid
     */
    isLoginInvalid() {
        return session.invalidLogin;
    }
}
exports.PagePresenter = PagePresenter;
//# sourceMappingURL=PagePresenter.js.map