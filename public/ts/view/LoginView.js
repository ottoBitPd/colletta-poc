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
class LoginView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.error = "";
    }
    setError(error) {
        this.error = error;
    }
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
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
                "<p class='red'>" + this.error + "</p>" +
                "<form method=\"POST\" action=\"/checklogin\"> " +
                "<input type=\"text\" id=\"username\" name=\"username\" placeholder='Inserisci la tua username'/> " +
                "<input type=\"password\" id=\"password\" name=\"password\" placeholder='Inserisci la tua password'/> " +
                "<input type=\"submit\" value=\"invia\"/> " +
                "</form> " +
                "<a href=\"/registration\">Registrati</a>" +
                "</div> " +
                "</body> " +
                "</html>";
            // return this.fileSystem.readFileSync('./public/insert.html').toString();
        });
    }
}
exports.LoginView = LoginView;
//# sourceMappingURL=LoginView.js.map