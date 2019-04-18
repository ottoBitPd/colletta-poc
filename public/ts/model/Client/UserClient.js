"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUserManager_1 = require("../DatabaseManager/DatabaseUserManager");
const Teacher_1 = require("../Data/Teacher");
const Student_1 = require("../Data/Student");
class UserClient {
    constructor() {
        this.passwordHash = require('bcryptjs');
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    insertStudent(username, password, name, surname, city, school, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Student_1.Student("0", username, password, name, surname, city, school, email));
        });
    }
    insertTeacher(username, password, name, surname, city, school, inps, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Teacher_1.Teacher("0", username, password, name, surname, city, school, inps, email));
        });
    }
    verifyUser(username, insertedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = yield this.dbUserManager.search(username);
            if (idUser !== "false") {
                const user = yield this.dbUserManager.read(idUser);
                if (user !== null) {
                    const password = user.getPassword();
                    return this.checkPassword(insertedPassword, password);
                }
                else {
                    //console.log("password dont match")
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    checkPassword(insertedPassword, password) {
        if (this.passwordHash.compareSync(insertedPassword, password)) {
            //console.log("password match");
            return true;
        }
        else {
            //console.log("password dont match")
            return false;
        }
    }
    isTeacher(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dbUserManager.search(username);
            const user = yield this.dbUserManager.read(id);
            //console.log((<User>user));
            //console.log((<User>user).getUsername());
            if (user !== undefined)
                return user.isTeacher();
            else
                return false;
        });
    }
    teacherList() {
        return __awaiter(this, void 0, void 0, function* () {
            let teacherMap = yield this.dbUserManager.elements();
            let list = [];
            for (let teacher of teacherMap) {
                let condition = yield this.isTeacher(teacher[1]);
                if (condition)
                    list.push(teacher[0]);
            }
            return list;
        });
    }
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.search(username);
        });
    }
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dbUserManager.read(id);
            let userData = user.toJSON();
            if (user.isTeacher()) {
                userData.inps = user.getINPS();
            }
            else if (user.isStudent()) {
                userData.classId = user.getClassId();
            }
            return userData;
        });
    }
    updateUser(username, userUpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dbUserManager.search(username);
            yield this.dbUserManager.update('data/users/' + id + '/name', userUpdateData.name);
            yield this.dbUserManager.update('data/users/' + id + '/lastname', userUpdateData.lastname);
            yield this.dbUserManager.update('data/users/' + id + '/city', userUpdateData.city);
            yield this.dbUserManager.update('data/users/' + id + '/school', userUpdateData.school);
            yield this.dbUserManager.update('data/users/' + id + '/email', userUpdateData.email);
            yield this.dbUserManager.update('data/users/' + id + '/username', userUpdateData.username);
            yield this.dbUserManager.update('data/users/' + id + '/password', userUpdateData.password);
            if (userUpdateData.inps !== undefined) {
                yield this.dbUserManager.update('data/users/' + id + '/INPScode', userUpdateData.inps);
            }
        });
    }
    /**
     *
     * @param substring
     * @param teacher - false if you want to search student only, true if you want to search teacher only
     */
    searchUser(substring, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            var regex = new RegExp(substring, "i");
            var elements = yield this.dbUserManager.elements(); //returns a map<id,sentence> of all exercises in the db
            var mapToReturn = new Map();
            console.log("User: ", elements);
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let value = entry[1];
                let user = yield this.dbUserManager.read(key);
                if (teacher && user.isTeacher()) {
                    if (value.search(regex) >= 0) {
                        mapToReturn.set(key, value);
                    }
                }
                else if (!teacher && !user.isTeacher()) {
                    if (value.search(regex) >= 0) {
                        mapToReturn.set(key, value);
                    }
                }
            }
            return mapToReturn;
        });
    }
    hashPassword(plain) {
        return this.passwordHash.hashSync(plain, 10);
    }
    addClassToStudent(studentId, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbUserManager.update('data/users/' + studentId + '/classId', classId);
        });
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map