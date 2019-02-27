const InsertPageController = require("./js/controller/InsertPageController.js");
const ExercisePageController = require("./js/controller/ExercisePageController.js");
const SavePageController = require("./js/controller/SavePageController.js");
const InsertPageView = require("./js/view/InsertPageView.js");
const ExercisePageView = require("./js/view/ExercisePageView.js");
const SavePageView = require("./js/view/SavePageView.js");

const express = require('express');
var app = express();

/*bodyParser is needed to get the post values from html forms*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
/*use static path public is needed to link css files with html pages*/
app.use(express.static(__dirname + '/public'));
/*creating a FireBaseAdapter object to use Firebase database in the classes which require it*/
var FirebaseAdapter = require('./js/model/FirebaseAdapter.js');
const objDb = new FirebaseAdapter();

var insertPageView = new InsertPageView();
var insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

var exercisePageView = new ExercisePageView();
var exercisePage = new ExercisePageController(exercisePageView, objDb );
exercisePage.update(app);

var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);



/**
 * Binds and listens for connections on the specified host and port. (Creates the server).
 * @param port - the port where listen for connections callback function
 */
app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
});
