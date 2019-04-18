/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
enum UserKind {
    user =0,
    student = 1,
    teacher =2
}

abstract class PageView {
    protected title : any;
    protected menuList: any;
    protected userKind : UserKind;
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor(){
        this.menuList = null;
        this.title = null;
        this.userKind = 0;
    }

    setTitle(value: any) {
        this.title = value;
    }

    setMenuList(value: any) {
        this.menuList = value;
    }

    setUserKind(usr : UserKind) {
        this.userKind = usr;
    }

    getUserKind() : UserKind{
        return this.userKind;
    }

    getHead(style? : string) : string {
        let ret = "<!DOCTYPE html>" +
        "<html lang=\"it\">\n" +
        "\t<head>\n" +
        "\t\t<meta charset=\"UTF-8\">\n" +
        "\t\t<title>"+this.title+"</title>\n" +
        "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n"+
        "\t\t<!--bootstrap-->" +
        "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
        "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">" +
        "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
        "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
        "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n";
            if(style!==undefined){ ret += style;}
        ret += "\t</head>\n" +
        "<body>\n";
        return ret;
    }
    getFoot(script : string) : string {
        return "</body>" +
            "\t<script>"+script+"</script>" +
        "</html>";
    }


    abstract async getPage() : Promise<string>;



}
export {PageView};
export {UserKind};