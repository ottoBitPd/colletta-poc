const DatabaseManager = require("./DatabaseManager.js");
/** Class to manage database. */
class FirebaseAdapter extends DatabaseManager {
    /**
     * FirebaseAdapter constructor initializes all attributes needed to FirebaseAdapter object
     */
    constructor() {
        super();
        this.database = this.initDB();
        this.sentences=0;
        this.database.ref('data/sentences').on("value", snap => {
            this.sentences=snap.numChildren();
            //console.log("inizio key: "+this.sentences);
        });
    }

    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    initDB(){
        var admin = require("firebase-admin");

        var serviceAccount = require("./colletta-3e789-firebase-adminsdk-e5uh6-e2795ef617.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://colletta-3e789.firebaseio.com"
        });
        return admin.database();
    }

    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    writeSentence(sentence){
        this.database.ref('data/sentences/'+this.sentences).set({sentence: sentence});
        return this.sentences-1;
    }




    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    checkIfExists(sentence){
        var equal=false;
        for(var sentenceKey=0;sentenceKey<this.sentences;sentenceKey++){
            this.database.ref('data/sentences/'+sentenceKey).on("value", snap => {
                if(sentence.toLowerCase()===snap.val().sentence.toLowerCase()){
                    equal=true;
                }
            });
            if(equal) {
                return sentenceKey;
            }
        }
        return -1;

    }

    /**
     * This method write the sentence solution on the database.
     * The sentence solution is composed of tags coming from hunpos and from user correction,
     * these tags are contained in finalTags parameter.
     * @param words - array containing the sentence words
     * @param finalTags - array containing the sentence tags
     * @param sentence - the sentence string
     * @param sentenceKey - key of the sentence in the database
     */
    writeSolution(words, finalTags, sentence, sentenceKey){
        let solutionKey=0;
        this.database.ref('data/sentences/'+sentenceKey+'/solutions').once("value", snap => {solutionKey=snap.numChildren();});
        for(var wordSolutionKey=0;wordSolutionKey<words.length;wordSolutionKey++){
            this.database.ref('data/sentences/'+sentenceKey+'/solutions').child(solutionKey).child(wordSolutionKey).set({"word":words[wordSolutionKey],"tag":finalTags[wordSolutionKey]});
        }
    }

    /**
     * This method reads a sentence from the database and returns it
     * @param key - key of the sentence to read from the database
     * @returns {string} the sentence read
     */
    readSentence(key){
        var ret="";
        this.database.ref("data/sentences/"+key).on("value", snap => {ret = snap.val().sentence;});
        return ret;
    }
}

module.exports = FirebaseAdapter;