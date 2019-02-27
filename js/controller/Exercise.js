class Exercise {
    constructor(){
        this.sentence;
        this.key;
    }
    getSentence(){
        return this.sentence;
    }
    getKey(){
        return this.key;
    }
    setKey(key){
        this.key=key;
    }
    setSentence(sentence){
        this.sentence=sentence;
    }
    extractTags(objSolution){
        var tags =[];
        for(var i in objSolution.sentence){
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    }
}

module.exports = Exercise;