import {Exercise} from '../../../src/ts/model/Data/Exercise';
import {expect} from 'chai';
import 'mocha';
import {HunposManager} from "../../../src/ts/model/POSManager/HunposManager";
import {Solution} from "../../../src/ts/model/Data/Solution";

describe('Exercise', function() {
    let exercise : Exercise;
    beforeEach(function () {
        exercise = new Exercise("This is an example", "xxxxx");
    });

    describe('Exercise.getKey()', function () {
        it('should return the key\'s default value', function () {
            const obj = new Exercise("sentence", "authorIdValue");
            expect(obj.getKey()).to.equal("-1");
        });
    });

    /* //TODO: inserire nei test di integrazione
        context("read a database's exercise's key", function () {
           it("should return the database's key" , async function () {
               let objDb=new FirebaseExerciseManager();
               let objKey= await objDb.search("sentence");
               let obj=await objDb.read(objKey);
               expect(obj.getKey()).to.equal(objKey);
           })
        })
    */
    describe('Exercise.getSentence()', function () {
        it('should return the sentence', function() {
            expect(exercise.getSentence()).to.equal("This is an example");
        });
        /* //TODO:inserire nei test di integrazione
        context("read a database's exercise's sentence", function () {
            it("should return the database's sentence" , async function () {
                let objDb=new FirebaseExerciseManager();
                let objKey= await objDb.search("sentence");
                let obj=await objDb.read(objKey);
                expect(obj.getSentence()).to.equal("sentence");
            })
        })
        */
    });

    describe('ExerciseTest.getPOSManager()', function() {
        it('should not return a new POS Manager', function() {
            expect(exercise.getPOSManager()).to.be.an.instanceof(HunposManager);
        });
    });

    describe('Exercise.getAuthorId()', function () {
        context('input AuthorID', function() {
            it('should return the authorID', function() {
                expect(exercise.getAuthorId()).to.equal("xxxxx");
            });
        });
        /*  //TODO:inserire nei test di integrazione
            context("read a database's exercise's authorIdValue", function () {
                it("should return the database's sentence" , async function () {
                    let objDb=new FirebaseExerciseManager();
                    let objKey= await objDb.search("sentence");
                    let obj=await objDb.read(objKey);
                    expect(obj.getAuthorId()).to.equal("authorIdValue");
                })
            })
        */
    });

    describe('Exercise.setKey()', function() {
        it('should return a new key', function() {
            exercise.setKey("-2");
            expect(exercise.getKey()).to.equal("-2");
        });
    });

    describe('Exercise.setSentence()', function() {
        it('should return a new sentence', function() {
            exercise.setSentence("newSentence");
            expect(exercise.getSentence()).to.equal("newSentence");
        });
    });

    describe('Exercise.setSolution()',function () {
        it('exercise should have a new solution', function () {
            exercise.setSolution("1", [], [], 5);
            expect(exercise.getNewSolution()).to.be.an.instanceof(Solution);
        });
    });

    describe('Exercise.addSolution()', function () {
        it('should add a solution', function() {
            exercise.addSolution("xxx","1",[],[],5,new Map<string,number>(),1);
            expect(exercise.getSolutions()[0]).eql(new Solution("xxx","1",[],[],5,new Map<string,number>(),1));
        });
    });

    describe('Exercise.getSolutions()', function() {
        it('should have a empty list of solutions', function() {
            expect(exercise.getSolutions()).empty;
        });

        it('should have a non-empty list of solutions', function() {
            exercise.addSolution("xxx", "1", [], [], 5, new Map<string, number>(), 1);
            expect(exercise.getSolutions()).not.empty;
        });
    });

    describe('Exercise.addValutation',function () {
        let solution : Solution | null;
        let valutations : Map<string,number> | null;

        it('should throw exception',function () {
            expect(() => exercise.addValutation("",2)).to.throw(Error,"Nessuna soluzione proposta");
        });

        before(function () {
            exercise.setSolution('xxx',[],[],5);
            solution = exercise.getNewSolution();
            exercise.addValutation('1',10);
            if (solution) {
                valutations = solution.getValutations();
            }
        });

        it('should add a valutation to new solution',function () {
            if (valutations)
                expect(valutations.get('1')).equals(10);
            else
                expect(valutations).to.be.not.null;
        });
    });

    describe('Exercise.getNewSolution', function() {
        it('should return null', function() {
            expect(exercise.getNewSolution()).to.equal(null);
        });

        it('should return the new solution', function () {
            exercise.setSolution("1",[],[],5);
            expect(exercise.getNewSolution()).eql(new Solution(undefined,"1",[],[],5));
        });
    });

    describe('Exercise.autosolve()', function() {
        it('should return a no-null solution', function () {
            let autosolution = exercise.autosolve();
            expect(autosolution).not.equal(null) && expect(autosolution).not.eql([]);
        });
    });

    describe('Exercise.getSplitSentence', function() {
        it('should return an array with the split sentence', function() {
            expect(exercise.getSplitSentence()).eql(["This","is","an","example"]);
        });
    });

    describe('Exercise.evaluate()', function() {
        it('evaluation using hunpos', function() {
            exercise.setSolution("1",['a','a','a','a'],[],5);
            let autovalutation = exercise.evaluate();
            expect(autovalutation).gte(0) && expect(autovalutation).lte(10);
        });

        beforeEach(function () {
            exercise.addSolution("","teacher1",['a','a','a','a'],[],5,new Map<string,number>(),0);
            exercise.addSolution("","teacher2",['b','b','b','b'],[],5,new Map<string,number>(),0);
        });

        context('evaluation using a teacher solution', function() {
            it('with a correct solution', function () {
                exercise.setSolution("1", ['a', 'a', 'a', 'a'], [], 5);
                let autovalutation = exercise.evaluate("teacher1");
                expect(autovalutation).equals(10);
            });

            it('with an incorrect solution', function () {
                exercise.setSolution("1", ['a', 'a', 'a', 'a'], [], 5);
                let autovalutation = exercise.evaluate("teacher2");
                expect(autovalutation).equals(0);
            });

            it('with an half correct solution', function () {
                exercise.setSolution("1", ['a', 'a', 'b', 'b'], [], 5);
                let autovalutation = exercise.evaluate("teacher2");
                expect(autovalutation).equals(5);
            });

            it('with an almost correct solution', function () {
                exercise.setSolution("1", ['a', 'b', 'b', 'b'], [], 5);
                let autovalutation = exercise.evaluate("teacher2");
                expect(autovalutation).equals(7.5);
            });

            it('without his valutation',function () {
                exercise.setSolution("1", ['a', 'a', 'a', 'b'], [], 5);
                expect(() => exercise.evaluate("teacherN")).to.throw(Error,"ID non trovato");
            });

            it('without a solution set',function () {
                expect(exercise.evaluate()).equals(-1);
            });
        });

    });

    describe("Exercise.toJSON",function () {
       it ("should return 1",function () {
           let obj: any = {
               "sentence": exercise.getSentence(),
               "authorId" : exercise.getAuthorId(),
               "key" : exercise.getKey()
           };
           console.log("obj: ",obj);
           expect(exercise.toJSON()).eql({ sentence: 'This is an example', authorId: 'xxxxx', key: '-1'});
       });
    });
});
