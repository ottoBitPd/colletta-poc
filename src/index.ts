import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {ExerciseView} from "./ts/view/ExerciseView";
import {ProfileView} from "./ts/view/ProfileView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {SearchView} from "./ts/view/SearchView";
import {ClassesView} from "./ts/view/ClassesView";
import {ClassView} from "./ts/view/ClassView";


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

new InsertPageView(app);
new ProfileView(app);
new RegistrationView(app);
new ExerciseView(app);
new SearchView(app);
new ClassesView(app);
new ClassView(app);
/*
//OLD STYLE
const exercisePage = new ExercisePresenter(exerciseView, savePageView);
exercisePage.update(app);

const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationPresenter(loginView,registrationView);
LoginPage.update(app);
*/

//import {Client} from "./ts/model/Client/Client";

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
/*
    //let students : any = ["-Lc7XAI7V9aosgn3mjV3","-Lc7XDQssWq0tULL7BPc"];//a e b
    //let exercises : any = ["-LbqtnBcdB6IPyvIcfMf","-LbqttUcndjqToqpXmRL"];//ciao mario e ciao minerva
    let classClient = (new Client.builder()).buildClassClient().build().getClassClient();
    if(classClient) {
        //await classClient.addClass("Classe2", "descrizione della classe", "-Lc7WiFeQaE_h74z_Dib");
        //await classClient.addStudent("-Lc7XDQssWq0tULL7BPc","-LcMIUZDuNItK4gFppoh");
    }*/
    /*
    let userClient = (new Client.builder()).buildUserClient().build().getUserClient();
    if(userClient) {
        let students = await userClient.searchUser("b",true);
        console.log("arriva: ",students);
    }*/
});

