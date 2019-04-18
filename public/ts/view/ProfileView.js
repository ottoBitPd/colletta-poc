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
const ProfilePresenter_1 = require("../presenter/ProfilePresenter");
class ProfileView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.profileController = new ProfilePresenter_1.ProfilePresenter(this);
        this.profileController.update(app);
        this.userData = undefined;
        this.error = undefined;
    }
    setUserData(obj) {
        this.userData = obj;
    }
    setError(error) {
        this.error = error;
    }
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = this.getHead();
            ret += yield this.getMenu();
            ret += "<div class=\"container\">" +
                "\t<h1 class ='text-center mb-5'>Informazioni profilo:</h1>\n";
            if (this.error !== undefined) {
                ret += "\t<p class ='text-center h5 text-danger'>" + this.error + "</p>\n";
            }
            ret += "\t<ul class=\"list-group\">\n" +
                "\t<li class=\"list-group-item\">\n" +
                "<form method='post' action='/update'>" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Nome: " + this.userData.name + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='name'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Cognome: " + this.userData.lastname + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='lastname'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Città: " + this.userData.city + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='city'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Scuola: " + this.userData.school + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='school'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n";
            if (this.userKind == PageView_1.UserKind.teacher) {
                ret += "\t\t<div class= \"row\">\n" +
                    "\t\t\t<div class = \"col-sm-6\">\n" +
                    "\t\t\t\t<p class= \" font-weight-bold\"> Matricola INPS: " + this.userData.inps + "</p> \n" +
                    "\t\t\t</div>\n" +
                    "\t\t\t<div class = \"col-sm-6\">\n" +
                    "\t\t\t\t<input class=\"form-control\" name='inps'/>\n" +
                    "\t\t\t</div>\n" +
                    "\t\t</div>";
            }
            ret += "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Email: " + this.userData.email + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" type='email' name='email'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Username: " + this.userData.username + "</p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='username'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Vecchia password: </p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" type='password' name='oldpassword'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n" +
                "\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \"font-weight-bold\"> Nuova password: </p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" type='password' name='password'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>\n";
            ret += "" +
                "\t\t\t<div class = \"col-sm-12 text-center mt-3\">\n" +
                "\t\t\t\t<button class='btn btn-primary btn-sm' id='btnsubmit' type='submit'>Modifica</button> \n" +
                "\t\t\t</div>\n" +
                "</form>" +
                "\t</li>\n" +
                "\t</ul>";
            /*if(this.userKind === UserKind.student){
                //TODO controllare questo codice renderlo dinamico
                ret+="<div class=\"row\" style=\"margin-top: 15%; margin-bottom:10%\">\n" +
                    "\t\t<div id= \"progress\" class = \" anchor col-sm-6 mx-auto\">\n" +
                    "\t\t\t<h1 class ='text-center mb-5'>I tuoi progressi:</h1>\n" +
                    "\t\t\t<ul class=\"list-group\">\n" +
                    "\t\t\t\t<li class=\"list-group-item\">\n" +
                    "\t\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Esercizi svolti:</p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class=\"font-weight-light\"> 10 </p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Media valutazioni:</p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.53 </p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t<div class=\"mt-2\" id=\"chartdiv\" style=\"width: 100%; height: 400px; background-color: #FFFFFF;\" ></div>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</li>\n" +
                    "\t\t\t</ul>\n" +
                    "\t\t\t\n" +
                    "\t\t</div>\n" +
                    "\t\t\n" +
                    "\t<div class = \"col-sm-6 mx-auto\">\n" +
                    "\t\t<h1 class ='text-center mb-5'>Media per argomenti trattati:</h1>\n" +
                    "\t\t<ul class=\"list-group\">\n" +
                    "\t\t\t<li class=\"list-group-item\">\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Aggettivi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Avverbi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 5.24 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Verbi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 9.3 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Nomi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.1 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Preposizioni:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 4.2 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Articoli:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 7 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Congiunzioni:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.02 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Pronomi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 4 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t</li>\n" +
                    "\t\t</ul>\n" +
                    "\t</div>";
            }*/
            ret += "</div>";
            ret += this.getFoot(this.getScript());
            return ret;
        });
    }
    getMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = "" +
                "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
                "\t<a href='/' class=\"navbar-brand\">Colletta</a>" +
                "\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
                "\t\t<span class=\"navbar-toggler-icon\"></span>" +
                "\t</button>" +
                "\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
                "\t\t<ul class=\"navbar-nav mr-auto\">";
            if (this.userKind === PageView_1.UserKind.student) {
                ret += "" +
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a id=\"toProgress\" href= \"#progress\" class=\"nav-link\" >I tuoi progressi</a>\n" +
                    "\t\t\t</li>\n";
                let classId = yield this.profileController.getStudentClass();
                console.log("classIdView: ", classId);
                if (classId !== "undefined") {
                    ret += "\t\t\t<li class=\"nav-item\">\n" +
                        "\t\t\t\t<a href= \"/class?classId=" + classId + "\" class=\"nav-link\" >La tua classe</a>\n" +
                        "\t\t\t</li>\n";
                }
            }
            else { //insegnante
                ret += "" +
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Area classi</a>\n" +
                    "\t\t\t</li>\n" +
                    "<li class=\"nav-item\">\n" +
                    //href= "/exercise/insert" credo
                    "\t\t\t\t<a href= \"#\" class=\"nav-link\" onclick='document.getElementById(\"insertExerciseForm\").classList.toggle(\"d-none\")'>Crea esercizio</a>\n" +
                    "\t\t\t</li>\n";
            }
            ret += "\t\t</ul>";
            //aggiungo login o logout
            ret += this.getLoginArea();
            ret += "\t</div>" +
                "</nav>";
            ret +=
                "<form method='post' action='/exercise/insert' id='insertExerciseForm' class='d-none'>" +
                    "   <div class=\"input-group col-sm-4 py-2 bg-dark\">" +
                    "       <input type=\"text\" name=\"sentence\" class=\"form-control\">" +
                    "       <button type=\"submit\" class=\"btn btn-primary\">Invia</button>" +
                    "   </div>" +
                    "</form>";
            return ret;
        });
    }
    getLoginArea() {
        if (this.profileController.isLoggedIn()) {
            return "" +
                "        <form class='form-inline' action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>" +
                "           </div>" +
                "        </form>";
        }
        else {
            let ret = "";
            ret += "" +
                "\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if (this.profileController.isLoginInvalid()) {
                ret += "\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret += "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n" +
                "\t\t\t</div>\n" +
                "\t\t</form>\n";
            return ret;
        }
    }
    getScript() {
        return "" +
            "function a(){\n" +
            "alert('ocio');\n" +
            "}\n" +
            "function fupdate(value){\n" +
            "   var submit = document.getElementById('btnsubmit');\n" +
            "alert('value: '+value);\n" +
            "   if(value.match([^\\s])){\n" +
            "       submit.removeAttribute('disabled','');\n" +
            "   }\n" +
            "   else{\n" +
            "       submit.setAttribute('disabled','');\n" +
            "   }\n" +
            "}\n";
    }
}
exports.ProfileView = ProfileView;
//# sourceMappingURL=ProfileView.js.map