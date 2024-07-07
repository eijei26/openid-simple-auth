"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const axios_1 = __importDefault(require("axios"));
class UserService {
    constructor(connectionOptions, adminAccessToken) {
        this.connectionOptions = connectionOptions;
        this.adminAccessToken = adminAccessToken;
        this.defaultHeaders = {
            'Authorization': `Bearer ${this.adminAccessToken}`,
            'Content-Type': 'application/json'
        };
    }
    registerUser(userDetails, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registrationUrl = (config === null || config === void 0 ? void 0 : config.url) || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users`;
                const headers = (config === null || config === void 0 ? void 0 : config.headers) || this.defaultHeaders;
                const response = yield axios_1.default.post(registrationUrl, userDetails, {
                    headers,
                });
                return response.data;
            }
            catch (e) {
                console.error(e);
                throw new Error('Error in registering a user');
            }
        });
    }
    getUser(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUserUrl = (config === null || config === void 0 ? void 0 : config.url) || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
                const headers = (config === null || config === void 0 ? void 0 : config.headers) || this.defaultHeaders;
                const response = yield axios_1.default.get(getUserUrl, {
                    headers,
                });
                return response.data;
            }
            catch (e) {
                console.error(e);
                throw new Error('Error in getting user details');
            }
        });
    }
    updateUser(userId, userDetails, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
                const headers = (config === null || config === void 0 ? void 0 : config.headers) || this.defaultHeaders;
                const response = yield axios_1.default.put(updateUserUrl, userDetails, {
                    headers,
                });
                return response.data;
            }
            catch (e) {
                console.error(e);
                throw new Error('Error in updating a user');
            }
        });
    }
    deleteUser(userId, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
                const headers = (config === null || config === void 0 ? void 0 : config.headers) || this.defaultHeaders;
                const response = yield axios_1.default.delete(updateUserUrl, {
                    headers,
                });
                return response.data;
            }
            catch (e) {
                console.error(e);
                throw new Error('Error in updating a user');
            }
        });
    }
}
exports.UserService = UserService;
