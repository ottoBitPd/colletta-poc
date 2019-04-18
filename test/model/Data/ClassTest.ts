import {Class} from "../../../src/ts/model/Data/Class";
import {expect} from 'chai';
import 'mocha';



describe('Class', function() {
    let obj : Class;
    let student : Class;
    let exercise : Class;
    beforeEach(function() {
        obj= new Class("0","name", "description","1234",["st1", "st2"],["es1", "es2"]);
        student= new Class("0","name", "description","1234",["st1", "st2"],["es1", "es2"]);
        exercise= new Class("0","name", "description","1234",["st1", "st2"],["es1", "es2"]);
    });

    describe ("Class.getID()", function () {
        it('should return 0', function() {
            expect(obj.getId()).to.equals("0");
        });
    });

    describe('Class.getName()', function() {
        it('should return the name', function() {
            expect(obj.getName()).to.equal("name");
        });
    });

    describe('Class.getDescription()', function() {
      it('should return the description', function() {
          expect(obj.getDescription()).to.equal("description");
      });
    });

    describe('Class.getTeacherID()', function() {
        it('should return the teacherID', function() {
            expect(obj.getTeacherID()).to.equal("1234");
        });
    });

    describe('Class.getStudents()', function() {
        it('should return the student', function() {
            expect(obj.getStudents().every((snap)=> (["st1","st2"].indexOf(snap)!==-1)));
        });
    });

    describe('Class.getExercises()', function() {
        it('should return the exercise', function() {
            expect(obj.getExercises().every((snap)=> (["es1, es2"].indexOf(snap)!==-1)));
        });
    });

    describe('Class.getNumberOfStudents()', function() {
        it('should return the numbers of students', function() {
            expect(obj.getNumberOfStudents()).to.equal(2);
        });
    });

    describe('Class.deleteStudent()', function() {
        it('should return delete students', function() {
            const array=["st2","st1"];
            array.pop();
            obj.deleteStudent("st1");
            expect(obj.getStudents()).eql(array.filter(e => e !== "st1"));

        });
    });

    describe('Class.deleteExercise()', function() {
        it('should return delete exercise', function() {
            const array = ["es1", "es2"];
            obj.deleteExercise("es1");
            expect(obj.getExercises()).eql(array.filter(e => e !== "es1"));

        });
    });

    describe('Class.addStudent()', function() {
        it('should return add Student', function() {
            const array=["st1","st2"];
            array.push("st3");
            student.addStudent("st3");
            expect(student.getStudents()).eql(array);

        });
    });

    describe('Class.addExercise()', function() {
        it('should return add exercise', function() {
            const array=["es1","es2"];
            array.push("es3");
            exercise.addExercise("es3");
            expect(exercise.getExercises()).eql(array);

        });
    });

    describe('Class.findStudent()', function() {
        it('should return true', function() {
            expect(student.findStudent("st2")).to.be.true;
        });

        it('should return false',function () {
           expect(student.findStudent("cccc")).to.be.false;
        });
    });

    describe('Class.toJSON()', function () {
        it('should return a json', function() {
            let json = obj.toJSON();
            expect(json).to.eql({
                "id" : "0",
                "name": "name",
                "description": "description",
                "teacherID": "1234",
                "students": ["st1", "st2"],
                "exercises": ["es1", "es2"]
            });
        });
    });
});