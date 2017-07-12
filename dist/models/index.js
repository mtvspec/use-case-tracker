"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
exports.db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
})
    .forEach(function (file) {
    let model = sequelize.import(path.join(__dirname, file));
    exports.db[model.name] = model;
});
Object.keys(exports.db).forEach(function (modelName) {
    if ("associate" in exports.db[modelName]) {
        exports.db[modelName].associate(exports.db);
    }
});
//# sourceMappingURL=index.js.map