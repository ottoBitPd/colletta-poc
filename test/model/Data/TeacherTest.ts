import {expect} from 'chai';
import 'mocha';
import {Teacher} from "../../../src/ts/model/Data/Teacher";
import {Class} from "../../../src/ts/model/Data/Class";




describe('Teacher', function() {

    let learn = new Teacher("1","Bortolone", "ciao", "Michele", "Bortone", "Scorze", "Venezia", "A110", "borto.lone@gmail.com");

    describe('Teacher.getUsername()', function () {
        it('should return the username', function () {
            expect(learn.getUsername()).to.equal("Bortolone");
        });
    });

    describe('Teacher.getName()', function () {
        it('should return the username', function () {
            expect(learn.getName()).to.equal("Michele");
        });
    });

    describe('Teacher.getLastName()', function () {
        it('should return the last name', function () {
            expect(learn.getLastName()).to.equal("Bortone");
        });
    });

    describe('Teacher.getCity()', function () {
        it('should return the city', function () {
            expect(learn.getCity()).to.equal("Scorze");
        });
    });

    describe('Teacher.getSchool()', function () {
        it('should return the school', function () {
            expect(learn.getSchool()).to.equal("Venezia");
        });
    });

    describe('Teacher.getPassword()', function () {
        it('should return the password', function () {
            expect(learn.getPassword()).to.equal("ciao");
        });
    });

    describe('Teacher.getEmail()', function () {
        it('should return the email', function () {
            expect(learn.getEmail()).to.equal("borto.lone@gmail.com");
        });
    });

    describe('Teacher.getINPS()', function () {
        it('should return the code inps', function () {
            expect(learn.getINPS()).to.equal("A110");
        });
    });

    describe('Teacher.isTeacher()', function () {
        it('should return is teacher', function () {

            expect(learn.isTeacher()).to.equal(true);
        });
    });

    describe('Teacher.getClasses()', function () {
        it('should return classes', function () {

            var teacher1=new Teacher("1","Bortolone", "ciao", "Michele", "Bortone", "Scorze", "Venezia", "A110","borto.lone@gmail.com");
          //  var teacher2=new Teacher("3","Perry15", "ciao", "Perry", "Peron", "Scorze", "Venezia", "A111");
            let uno= new Class("0","name", "description","1",["st1", "st2"],["es1", "es2"]);
            let due= new Class("0","name", "description","1",["st1", "st2"],["es1", "es2"]);
            let tre= new Class("0","name", "description","3",["st1", "st2"],["es1", "es2"]);

            expect(teacher1.getClasses([uno,due,tre])).eql([uno,due]);
        });
    });

    describe('Teacher.toJSON()', function () {
        it('should return a JSON representing the teacher', function () {
            let val = {
                "id" : "1",
                "username": "Bortolone",
                "password" : "ciao",
                "name" : "Michele",
                "lastname" : "Bortone",
                "city" : "Scorze",
                "school" : "Venezia",
                "email" : "borto.lone@gmail.com"
            };

            expect(learn.toJSON()).eql(val);
        });
    });

});
