"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const crud_generator_1 = require("./crud-generator");
// const generateCrud = require('./generateCrud');
const program = new commander_1.default.Command();
program
    .arguments('<entityName>')
    .action((entityName) => {
    (0, crud_generator_1.crudGenerator)(entityName);
});
program.parse(process.argv);
