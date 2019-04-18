"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, username, password, name, lastname, city, school, email) {
        this.DatabaseUserInfo = class {
            constructor(id, psw, name, lN, city, sc, email) {
                this.id = id;
                this.password = psw;
                this.name = name;
                this.lastName = lN;
                this.city = city;
                this.school = sc;
                this.email = email;
            }
        };
        this.username = username;
        this.databaseInfo = new this.DatabaseUserInfo(id, password, name, lastname, city, school, email);
    }
    getUsername() {
        return this.username;
    }
    getName() {
        return this.databaseInfo.name;
    }
    getLastName() {
        return this.databaseInfo.lastName;
    }
    getCity() {
        return this.databaseInfo.city;
    }
    getSchool() {
        return this.databaseInfo.school;
    }
    getPassword() {
        return this.databaseInfo.password;
    }
    getEmail() {
        return this.databaseInfo.email;
    }
    samePassword(otherPassword) {
        if (otherPassword === this.databaseInfo.password)
            return true;
        return false;
    }
    setID(id) {
        this.databaseInfo.id = id;
    }
    isTeacher() {
        return false;
    }
    isStudent() {
        return false;
    }
    getID() {
        return this.databaseInfo.id;
    }
    toJSON() {
        let user = {
            "username": this.username,
            "id": this.databaseInfo.id,
            "password": this.databaseInfo.password,
            "name": this.databaseInfo.name,
            "lastname": this.databaseInfo.lastName,
            "city": this.databaseInfo.city,
            "school": this.databaseInfo.school,
            "email": this.databaseInfo.email
        };
        return user;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map