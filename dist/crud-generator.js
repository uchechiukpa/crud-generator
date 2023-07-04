"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudGenerator = void 0;
const ejs = __importStar(require("ejs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// sourceDir, destinationDir,
function renderDirectory(sourceDir, destinationDir, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure the destination directory exists
        fs.mkdirSync(destinationDir, { recursive: true });
        // Read all items in the source directory
        const items = fs.readdirSync(sourceDir, { withFileTypes: true });
        for (const item of items) {
            const sourcePath = path.join(sourceDir, item.name);
            const destinationPath = path.join(destinationDir, item.name).replace('user', data.entityName.toLowerCase());
            if (item.isDirectory()) {
                // If the item is a directory, recursively render it
                yield renderDirectory(sourcePath, destinationPath, data);
            }
            else if (item.isFile() && path.extname(item.name) === '.ejs') {
                // If the item is an EJS file, render it to the destination directory
                const template = fs.readFileSync(sourcePath, 'utf8');
                const output = ejs.render(template, data);
                fs.writeFileSync(destinationPath.replace('.ejs', '.ts'), output);
            }
        }
    });
}
function crudGenerator(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = { entityName: data };
        const sourceDir = path.join(__dirname, '..', 'users');
        const destinationDir = path.join(process.cwd(), `src/${element.entityName.toLowerCase()}`);
        renderDirectory(sourceDir, destinationDir, element);
    });
}
exports.crudGenerator = crudGenerator;
