"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const init_1 = __importDefault(require("./init"));
exports.default = {
    initializeConnection: init_1.default,
    authService: auth_1.default,
};
