import {Client} from "../model/Client/Client";

var session = require('express-session');

abstract class PagePresenter{
    protected view: any;
    protected client : Client;
    constructor(view : any ){
        this.view=view;
        this.client =  (new Client.builder()).build();
    }
    /**
     * method used by the View to understand if ther is any user logged in
     */
    isLoggedIn() : boolean {
        return session.username!==undefined;
    }

    /**
     * method used by the View to understand if the login is valid
     */
    isLoginInvalid() : boolean {
        return session.invalidLogin;
    }


    abstract update(app : any) : void;
    /*
    //forse è un idea
    setView(view:any) : void{
        this.view=view;
    }*/

}
export {PagePresenter};