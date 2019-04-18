"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseManager {
    constructor(fm) {
        this.firebaseManager = fm;
    }
    getDatabase() {
        return this.firebaseManager;
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=DatabaseManager.js.map