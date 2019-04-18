import {PageView} from "./PageView";
import {ClassesPresenter} from "../presenter/ClassesPresenter";

class ClassesView extends PageView {

    private classPresenter : ClassesPresenter;
    //private classesList: any;
    constructor(app : any){
        super();
        this.classPresenter =  new ClassesPresenter(this);
        this.classPresenter.update(app);
        //this.classesList = null;
    }

    /*public setClassesList(value: any) {
        this.classesList = value;
    }*/

    async getPage() {
        let ret = this.getHead();
        ret +=this.getMenu();
        ret +="\t<div class=\"container\">" +
            "\t\t<div class='col-sm-10 mx-auto'>"+
            "\t\t\t<h1 class='text-center mb-5'>Le tue classi</h1>" +
            "\t\t\t<div class='col-sm-12 text-right'>\n" +
            "\t\t\t<a class=\"btn btn-primary my-3\" href=\"javascript:showInsertClassForm()\" role=\"button\">Aggiungi una nuova classe</a>\n";
            ret+=this.insertClass();
            ret+="\t\t\t</div>\n";
            ret+= await this.printList();
            ret+="\t\t</div>" +
            "\t</div>";
        ret+=this.getFoot(this.getScript());
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
    private async printList() {
        let classes = await this.classPresenter.getClasses();
        if(classes === null){
            return "";//resultList is not set yet, cause nobody searched yet
        }
        if(classes.size<=0){
            return "<h2 class='h5 text-danger text-center'>Non hai classi</h2>";//resultList is not set yet, cause nobody searched yet
        }
        else {
            let ret = "" +
                "<div class=\"col-sm-12\" id=\"esercizio\">\n" +
                "<ul class='list-group text-center'>\n" +
                "<li class='list-group-item active'>\n" +
                "<div class='row'>\n" +
                "<div class='col-sm-4 mx-auto'>CLASSE</div>\n" +
                "<div class='col-sm-4 mx-auto'></div>\n" +
                "</div>\n" +
                "</li>\n";
            classes.forEach((value: string, key: string) => {
                ret+="<li class='list-group-item'>\n" +
                "<div class='row'>\n" +
                "<div class='col-sm-4 mx-auto'>\n" +
                /*"<form method='post' action='/class?classId="+key+"'>" +
                "<button class='btn btn-link btn-sm' name='key' value='"+key+"' type='submit'>"+value+"</button>\n" +
                "</form>" +*/
                "<a class='btn btn-link btn-sm' href='/class?classId="+key+"'>"+value+"</a>\n"+
                "</div>\n" +
                "<div class='col-sm-4 mx-auto text-center'>\n" +
                "<form method='post' action='/deleteclass'>" +
                "<button class='btn btn-danger btn-sm' name='key' value='"+key+"' type='submit'>Elimina</button>\n" +
                "</form>" +
                "</div>\n" +
                "</div>\n" +
                "</li>\n";
            });
            ret+="</ul>" +
                "</div>";
            return ret;
        }
    }
    private getScript() {
        return "" +
        "function showInsertClassForm(){\n" +
        "\tdocument.getElementById('insertClassForm').style.display = 'block';\n" +
        "}\n" +
        "function hideInsertClassForm(){\n" +
        "\tdocument.getElementById('insertClassForm').style.display = 'none';\n" +
        "}\n";
    }

    private insertClass() {
        let ret=""+
        "\t\t\t<form method='post' id='insertClassForm' action='/insertclass' style='display:none'>\n" +
        "\t\t\t\t<div class=\"form-group text-center\">\n" +
        "\t\t\t\t\t<label class='h5' for=\"sentence\">Inserisci i dati della classe</label>\n " +
        "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" name=\"classname\" placeholder=\"Inserisci il nome della classe\" required/>" +
        "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" name=\"description\" placeholder=\"Inserisci una descrizione della classe\" required/>" +
        "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\" onclick='hideInsertClassForm()'>Crea classe</button>" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</form>\n ";
        return ret;
    }
}
export {ClassesView};