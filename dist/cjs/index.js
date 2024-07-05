"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./auth/index.js"));
const index_js_2 = __importDefault(require("./init/index.js"));
exports.default = {
    initializeConnection: index_js_2.default,
    authService: index_js_1.default,
};
