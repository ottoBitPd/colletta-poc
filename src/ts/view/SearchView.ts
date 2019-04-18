import {PageView} from "./PageView";
import {SearchPresenter} from "../presenter/SearchPresenter";

class SearchView extends PageView{

    private searchPresenter : SearchPresenter;
    constructor(app : any){
        super();
        this.searchPresenter= new SearchPresenter(this);
        this.searchPresenter.update(app);
    }

    async getPage() {
        let ret = this.getHead();
        ret +=this.getMenu();
        ret +="<div class=\"container\">\n";
        if(this.searchPresenter.getSearchType()==="exercise" || this.searchPresenter.getSearchType()==="classExercise") {
            ret += "\t<h1 class ='text-center mb-5'>Ricerca esercizio</h1>\n" +
                "\t<form method ='post' action='/searchexercise'>\n";
        }
        if(this.searchPresenter.getSearchType()==="student") {
            ret += "\t<h1 class ='text-center mb-5'>Ricerca studente</h1>\n" +
            "\t<form method ='post' action='/searchstudent'>\n";
        }

        ret+="\t\t<div class=\"form-group\">\n"+
            "\t\t\t<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
            "\t\t</div>" +
            "\t\t<div class=\"form-group text-center\">" +
            "\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Cerca</button>" +
            "\t\t</div>" +
            "\t</form>";
            ret+= this.printList();
        ret+="</div>"+this.getFoot("");
        return ret;
    }

    private getMenu() : string {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "<ul class=\"navbar-nav mr-auto\">";
        for(let i in this.menuList) {
            ret += ""+
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "</li>";
        }
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="    </div>" +
            "</nav>";
        return ret;
    }

    private getLoginArea() : string {

        if(this.searchPresenter.isLoggedIn()){
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.searchPresenter.isLoginInvalid()){
                ret+="\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t</div>\n" +
                "\t\t</form>\n";
            return ret;
        }
    }

    private printList() {
        let results = this.searchPresenter.getResults();
        if(results===undefined){
            return "";//resultList is not set yet, cause nobody searched yet
        }
        if(results.size===0){
            return "<h2 class='h5 text-danger text-center'>Nessun risultato</h2>";//resultList is not set yet, cause nobody searched yet
        }
        let ret="";
        let form :string, title :string;
        title="FRASE";
        if(this.searchPresenter.getSearchType()==="exercise") {
            form="\t\t\t\t\t\t<form method='post' action='/exercise'>\n";
        }
        if(this.searchPresenter.getSearchType()==="classExercise") {
            form="\t\t\t\t\t\t<form method='post' action='/addexercise'>\n";
        }
        if(this.searchPresenter.getSearchType()==="student") {
            form="\t\t\t\t\t\t<form method='post' action='/addstudent'>\n";
            title="USERNAME";
        }
        if(results.size>0) {
            ret += "\t<div class=\"col-sm-12\">" +
                "\t\t<ul class=\"list-group\">\n" +
                "\t\t\t<li class='list-group-item active'>" +
                "\t\t\t\t<div class='row'>" +
                "\t\t\t\t\t<div class='col-sm-9 mx-auto'>" + title + "</div>" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'></div>" +
                "\t\t\t\t</div>" +
                "\t\t\t</li>";
        }
        results.forEach((value: string, key: string) => {
            ret+="\t\t\t<li class=\"list-group-item\">" +
                "\t\t\t\t<div class='row'>" +
                "\t\t\t\t\t<div class='col-sm-9 mx-auto'>"+value+"</div>\n"+
                "\t\t\t\t\t<div class='col-sm-3 mx-auto text-center'>\n" +
                form;
            if(this.searchPresenter.getSearchType()==="exercise") {
                ret+="\t\t\t\t\t\t\t<button class='btn btn-primary btn-sm' name='sentence' value='" + value + "' type='submit'>Esegui esercizio</button>\n</form>\n</div>\n</div>";
            }
            if(this.searchPresenter.getSearchType()==="classExercise") {
                ret+="\t\t\t\t\t\t\t<button class='btn btn-primary btn-sm' name='exerciseId' value='" + key + "' type='submit'>Aggiungi esercizio alla classe</button>\n</form>\n</div>\n</div>";
            }
            if(this.searchPresenter.getSearchType()==="student") {
                ret+="\t\t\t\t\t\t\t<button class='btn btn-primary btn-sm' name='studentId' value='" + key + "' type='submit'>Aggiungi alla classe</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>";
            }
            ret+="\t\t\t</li>\n";
        });
        return "\t\t</ul>\n"+ret;
    }
}
export {SearchView};