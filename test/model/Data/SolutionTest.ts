import {Solution} from "../../../src/ts/model/Data/Solution";
import {expect} from 'chai';
import 'mocha';

describe('Solution',function () {
    let solution : Solution;
    beforeEach(function () {
        solution = new Solution("0","s0",["a","b","c"],["t1","t2"],
            5,new Map<string,number>(),0);
        solution.addNewMark("teacher1",10);
        solution.addNewMark("teacher2",5);
    });

    describe('Solution.getKey()', function () {
        it("should return the key",function () {
            expect(solution.getKey()).to.equals("0");
        })
    });

    describe('Solution.getSolverId()', function () {
        it("should return the solver's id",function () {
            expect(solution.getSolverId()).to.equals("s0");
        })
    });

    describe('Solution.getTopics()', function () {
        context('when the solution has topics', function(){
            it("should return the array of the topics",function () {
                expect(solution.getTopics()).to.eql(["t1","t2"]);
            });
        });

        let solutionNullTopics : Solution;
        beforeEach(function () {
            solutionNullTopics = new Solution("0","s0",["a","b","c"],undefined,
                5,new Map<string,number>(),0);
        });

        context('when the solution hasn\'t topics', function(){
            it("should return null",function () {
                expect(solutionNullTopics.getTopics()).to.be.null;
            });
        });
    });

    describe('Solution.getDifficulty()', function () {
        context('when the solution has the difficulty',function(){
            it("should return the assigned difficulty",function () {
                expect(solution.getDifficulty()).to.equals(5);
            });
        });

        let solutionNullDifficulty : Solution;
        beforeEach(function () {
            solutionNullDifficulty = new Solution("0","s0",["a","b","c"],["t1","t2"],
                undefined,new Map<string,number>(),0);
        });

        context('when the solution has the difficulty',function(){
            it("should return the assigned difficulty",function () {
                expect(solution.getDifficulty()).to.equals(5);
            });
        });

        context('when the solution hasn\'t the difficulty',function(){
            it("should return null",function () {
                expect(solutionNullDifficulty.getDifficulty()).to.be.null;
            });
        });
    });

    describe('Solution.getSolutionTags()', function () {
        it("should return the tags of the solution",function () {
            expect(solution.getSolutionTags()).to.eql(["a","b","c"]);
        })
    });

    describe('Solution.getValutations()', function () {
        it("should return the key",function () {
            let vals = new Map<string,number>();
            vals.set("teacher1",10);
            vals.set("teacher2",5);
            expect(solution.getValutations()).to.eql(vals);
        })
    });

    describe('Solution.JSONValutations()',function () {
        context('when the solution has some valutation', function () {
            it('should return a JSON representing the valutations', function () {
                let vals = {
                    "teacher1" : 10,
                    "teacher2" : 5
                };

                expect(solution.JSONValutations()).to.eql(vals);
            });
        });

        context('when the solution hasn\'t any valutation',function () {
            beforeEach(function () {
                solution = new Solution("0","s0",["a","b","c"],["t1","t2"],
                    5,new Map<string,number>(),0);
            });

            it('should return an empty JSON',function () {
                expect(solution.JSONValutations()).to.eql({});
            })
        });
    });


});