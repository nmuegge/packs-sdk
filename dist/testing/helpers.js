"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForInput = exports.printAndExit = exports.print = exports.getManifestFromModule = void 0;
const readlineSync = __importStar(require("readline-sync"));
function getManifestFromModule(module) {
    if (!module.manifest) {
        printAndExit('Manifest file must export a variable called "manifest" that refers to a PackDefinition.');
    }
    return module.manifest;
}
exports.getManifestFromModule = getManifestFromModule;
// eslint-disable-next-line no-console
exports.print = console.log;
function printAndExit(msg, exitCode = 1) {
    exports.print(msg);
    return process.exit(exitCode);
}
exports.printAndExit = printAndExit;
function promptForInput(prompt, { mask } = {}) {
    return readlineSync.question(prompt, { mask: mask ? '*' : undefined, hideEchoBack: mask });
}
exports.promptForInput = promptForInput;