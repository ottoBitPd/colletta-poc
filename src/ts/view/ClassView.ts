import {PageView, UserKind} from "./PageView";
import {ClassPresenter} from "../presenter/ClassPresenter";

class ClassView extends PageView {

    private classPresenter : ClassPresenter;

    constructor(app : any){
        super();
        this.classPresenter =  new ClassPresenter(this);
        this.classPresenter.update(app);
    }

   /* public setClass(value: any) {
        this._class = value;
    }*/

    async getPage() {
        let _class = await this.classPresenter.getClass();
        let ret = this.getHead();
        ret += this.getMenu();
        ret += "\t<div class=\"container\">";
        ret += await this.printClassInfo();
        if(this.userKind===UserKind.teacher) {
            ret += "" +
                "\t<h1 class=\"text-center mt-5\">Studenti di questa classe</h1>\n" +
                "\t\t<div class='col-sm-12 text-right'>\n" +
                "\t\t\t<form method='post' action='/student/insert'>\n" +
                "\t\t\t\t<button class='btn btn-primary my-3' name='key' value='" + _class.id + "' type='submit'>Aggiungi uno studente</button>\n" +
                "\t\t\t</form>\n" +
                "\t\t</div>\n";
            "\t\t<div class='col-sm-12 text-right'>\n" +
            //"\t\t\t<button class='btn btn-primary my-3' name='key' value='-LbqtnBcdB6IPyvIcfMf' type='submit'>Aggiungi uno studente</button>\n" +
            "\t\t</div>\n";
            ret += await this.printStudentsList();
            ret += "" +
                "\t<h1 class=\"text-center mt-5\">Esercizi assegnati alla classe</h1>\n" +
                "\t\t<div class='col-sm-12 text-right'>\n" +
                "\t\t\t<form method='post' action='/class/exercise/search'>\n" +
                "\t\t\t\t<button class='btn btn-primary my-3' name='key' value='" + _class.id + "' type='submit'>Assegna un nuovo esercizio</button>\n" +
                "\t\t\t</form>\n" +
                "\t\t</div>\n";
        }
        else{
            ret += "" +
                "\t<h1 class=\"text-center mt-5\">Esercizi assegnati alla classe</h1>\n";
        }
        ret += await this.printExercisesList();

        ret += "\t</div>";
        ret += this.getFoot("");
        return ret;
    }
    private async printClassInfo(){
        let _class = await this.classPresenter.getClass();
        let ret = "" +
        "\t\t <div class=\"col-sm-12\" id=\"esercizio\">\n" +
        "\t\t\t<div class='row'>\n" +
        "\t\t\t\t<div class='col-sm-4 mx-auto text-center'>\n" +
        "\t\t\t\t\t<ul class=\"list-group mt-3\">\n" +
        "\t\t\t\t\t\t<li class=\"list-group-item active p-0 py-1\"><h1 class=\"h4\">Classe</h1></li>\n" +
        "\t\t\t\t\t\t<li class=\"list-group-item p-0 py-1\"><h1 class=\"h5\">"+_class.name+"</h1></li>\n" +
        "\t\t\t\t\t</ul>\n" +
        "\t\t\t\t</div>  \n" +
        "\t\t\t\t<div class='col-sm-4 mx-auto text-center'>\n" +
        "\t\t\t\t\t<ul class=\"list-group mt-3\">\n" +
        "\t\t\t\t\t\t<li class=\"list-group-item active p-0 py-1\"><h1 class=\"h4\">Descrizione</h1></li>\n" +
        "\t\t\t\t\t\t<li class=\"list-group-item p-0 py-1\"><h1 class=\"h5\">"+_class.description+"</h1></li>\n" +
        "\t\t\t\t\t</ul>\n" +
        "\t\t\t\t</div>   \n" +
        "\t\t\t\t<div class='col-sm-4 mx-auto text-center'>\n" +
        "\t\t\t\t\t<ul class=\"list-group mt-3\">\n" +
        "\t\t\t\t\t\t<li class=\"list-group-item active p-0 py-1\"><h1 class=\"h4\">Iscrizioni</h1></li>\n";
        ret += "\t\t\t\t\t\t<li class=\"list-group-item p-0 py-1\"><h1 class=\"h5\">" + await this.classPresenter.getStudentNumber() + " iscritti</h1></li>\n";
        ret += "\t\t\t\t\t</ul>\n" +
        "\t\t\t\t</div>  \n" +
        "\t\t\t</div>\n" +
        "\t\t</div>";
        return ret;
    }
    private getMenu() : string {
        let ret =""+
            "\t<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "\t\t<div class=\"navbar-brand\">Colletta</div>" +
            "\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "\t\t\t<span class=\"navbar-toggler-icon\"></span>" +
            "\t\t</button>" +
            "\t\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "\t\t\t<ul class=\"navbar-nav mr-auto\">";
        for(let i in this.menuList) {
            ret += ""+
                "\t\t\t\t<li class=\"nav-item\">" +
                "\t\t\t\t\t<a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "\t\t\t\t</li>";
        }
        ret+="\t\t\t</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="\t\t</div>" +
            "\t</nav>";
        return ret;
    }

    private getLoginArea() : string {

        if(this.classPresenter.isLoggedIn()){
            return "" +
                "\t\t\t<form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "\t\t\t\t<div class=\"form-group\">" +
                "\t\t\t\t\t<a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.classPresenter.isLoginInvalid()){
                ret+="\t\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">          \n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">           \n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n";
            return ret;
        }
    }
    private async printStudentsList() {
        let students = await this.classPresenter.getStudents();
        let _class = await this.classPresenter.getClass();
        if(students===undefined){
            return "<h2 class='h5 text-danger text-center'>Non ci sono studenti in questa classe</h2>";//resultList is not set yet, cause nobody searched yet
        }
        if(students.length<=0){
            return "<h2 class='h5 text-danger text-center'>Non ci sono studenti in questa classe</h2>";//resultList is not set yet, cause nobody searched yet
        }
        else {
            let ret = "" +
                "\t\t<div class=\"col-sm-12\">\n" +
                "\t\t<ul class='list-group text-center'>\n" +
                "\t\t\t<li class='list-group-item active'>\n" +
                "\t\t\t\t<div class='row'>\n" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'>COGNOME</div>\n" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'>NOME</div>\n" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'>USERNAME</div>\n" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'></div>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</li>\n";
            for( let i in students){
                ret+="\t\t\t<li class='list-group-item'>\n" +
                    "\t\t\t\t<div class='row'>\n" +
                    "\t\t\t\t\t<div class='col-sm-3 mx-auto'>"+students[i].lastname+"</div>\n" +
                    "\t\t\t\t\t<div class='col-sm-3 mx-auto'>"+students[i].name+"</div>\n" +
                    "\t\t\t\t\t<div class='col-sm-3 mx-auto'>"+students[i].username+"</div>\n" +
                    "\t\t\t\t\t<div class='col-sm-3 mx-auto'>"+
                    "\t\t\t\t\t\t<form method='post' action='/deletestudent'>" +
                    "\t\t\t\t\t\t\t<input  name='classId' value='"+_class.id+"' type='hidden'/>\n" +
                    "\t\t\t\t\t\t\t<button class='btn btn-danger btn-sm' name='studentId' value='"+students[i].id+"' type='submit'>Elimina</button>\n" +
                    "\t\t\t\t\t\t</form>" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t</li>\n";
            };
            ret+="\t\t</ul>\n\t\t</div>\n";
            return ret;
        }
    }
    private async printExercisesList() {
        let exercises = await this.classPresenter.getExercises()
        if(exercises===undefined){
            return "<h2 class='h5 text-danger text-center'>Non ci sono esercizi assegnati a questa classe</h2>";//resultList is not set yet, cause nobody searched yet
        }
        if(exercises.length<=0){
            return "<h2 class='h5 text-danger text-center'>Non ci sono esercizi assegnati a questa classe</h2>";//resultList is not set yet, cause nobody searched yet
        }
        else {
            let ret = "" +
                "\t\t<div class=\"col-sm-12\">\n" +
                "\t\t<ul class='list-group text-center'>\n" +
                "\t\t\t<li class='list-group-item active'>\n" +
                "\t\t\t\t<div class='row'>\n" +
                "\t\t\t\t\t<div class='col-sm-9 mx-auto'>FRASE</div>\n" +
                "\t\t\t\t\t<div class='col-sm-3 mx-auto'></div>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</li>\n";
            for( let i in exercises){
                ret+="\t\t\t<li class='list-group-item'>\n" +
                    "\t\t\t\t<div class='row'>\n" +
                    "\t\t\t\t\t<div class='col-sm-9 mx-auto'>"+exercises[i].sentence+"</div>\n" +
                    "\t\t\t\t\t<div class='col-sm-3 mx-auto'>";
                    if( this.userKind === UserKind.teacher) {
                        ret+="\t\t\t\t\t\t<form method='post' action='/deleteexercise'>" +
                        "\t\t\t\t\t\t\t<input  name='classId' value='" + this.classPresenter.getClassId() + "' type='hidden'/>\n" +
                        "\t\t\t\t\t\t\t<button class='btn btn-danger btn-sm' name='exerciseId' value='" + exercises[i].key + "' type='submit'>Elimina</button>\n" +
                        "\t\t\t\t\t\t</form>";
                    }
                    else{
                        ret+="\t\t\t\t\t\t<form method='post' action='/exercise'>" +
                        "\t\t\t\t\t\t\t<button class='btn btn-primary btn-sm' name='sentence' value='" + exercises[i].sentence + "' type='submit'>Esegui Esercizio</button>\n" +
                        "\t\t\t\t\t\t</form>";
                    }
                    ret+="\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t</li>\n";
            };
            ret+="\t\t</ul>\n\t\t</div>\n";
            return ret;
        }
    }


}
export {ClassView};