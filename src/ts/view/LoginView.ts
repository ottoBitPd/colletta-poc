import {PageView} from "./PageView";

class LoginView extends PageView{
    private error :string;
    constructor(app : any){
        super();
        this.error="";
    }
    setError(error:string){
        this.error=error;
    }
    async getPage() {
        return "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Login</title> " +
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div id=\"back\"> " +
            "<h1>LOGIN</h1>" +
            "<p class='red'>"+this.error+"</p>"+
            "<form method=\"POST\" action=\"/checklogin\"> " +
            "<input type=\"text\" id=\"username\" name=\"username\" placeholder='Inserisci la tua username'/> " +
            "<input type=\"password\" id=\"password\" name=\"password\" placeholder='Inserisci la tua password'/> " +
            "<input type=\"submit\" value=\"invia\"/> " +
            "</form> " +
            "<a href=\"/registration\">Registrati</a>"+
        "</div> " +
        "</body> " +
        "</html>";
        // return this.fileSystem.readFileSync('./public/insert.html').toString();
    }
}
export {LoginView};