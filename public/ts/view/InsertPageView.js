"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const InsertPresenter_1 = require("../presenter/InsertPresenter");
class InsertPageView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.exercisePresenter = new InsertPresenter_1.InsertPresenter(this);
        this.exercisePresenter.update(app);
    }
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = this.getHead();
            ret += this.getMenu();
            ret += "<div class=\"container\" style=\"margin-top: 10%\">" +
                "<h1 class ='text-center mb-5'>Inserisci frase</h1>" +
                "<form method ='post' action='/exercise'>" +
                "   <div class=\"form-group\">" +
                "       <input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
                "   </div>" +
                "   <div class=\"form-group text-center\">" +
                "       <button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>" +
                "   </div>" +
                "</form>";
            ret += "</div>" + this.getFoot("");
            return ret;
        });
    }
    getMenu() {
        let ret = "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
            "<ul class=\"navbar-nav mr-auto\">";
        for (let i in this.menuList) {
            ret += "" +
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\"" + this.menuList[i].link + "\">" + this.menuList[i].name + "</a>" +
                "</li>";
        }
        ret += "</ul>";
        //aggiungo login o logout
        ret += this.getLoginArea();
        ret += "    </div>" +
            "</nav>";
        return ret;
    }
    getLoginArea() {
        if (this.exercisePresenter.isLoggedIn()) {
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        else {
            let ret = "";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if (this.exercisePresenter.isLoginInvalid()) {
                ret += "<p class='text-danger m-1 p-1'>username o password invalidi</p>";
            }
            ret += "<div class=\"form-group\">               \n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">          \n" +
                "\t\t\t</div>\n" +
                "           <div class=\"form-group\">               \n" +
                "           \t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">           \n" +
                "           \t</div>\n" +
                "           <div class=\"form-group\">            \n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>  \n" +
                //"           \t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Registrati</button> \n" +          \n" +
                "<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>" +
                "           \t</div>\n" +
                "        </form>\n";
            return ret;
        }
    }
}
exports.InsertPageView = InsertPageView;
//# sourceMappingURL=InsertPageView.js.map