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
const DatabaseManager_1 = require("./DatabaseManager");
const FirebaseUserManager_1 = require("../Firebase/FirebaseUserManager");
class DatabaseUserManager extends DatabaseManager_1.DatabaseManager {
    constructor() {
        super(new FirebaseUserManager_1.FirebaseUserManager());
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().insert(obj);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().remove(id);
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().read(id);
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().update(path, value);
        });
    }
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().search(username);
        });
    }
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().elements();
        });
    }
}
exports.DatabaseUserManager = DatabaseUserManager;
//# sourceMappingURL=DatabaseUserManager.js.map