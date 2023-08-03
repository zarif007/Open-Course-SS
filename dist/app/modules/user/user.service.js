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
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield clerk_sdk_node_1.default.users.getUser(userId);
    const user = {
        id: result === null || result === void 0 ? void 0 : result.id,
        fullName: (_a = result === null || result === void 0 ? void 0 : result.firstName) !== null && _a !== void 0 ? _a : '' + (result === null || result === void 0 ? void 0 : result.lastName),
        imageUrl: result === null || result === void 0 ? void 0 : result.imageUrl,
        email: result === null || result === void 0 ? void 0 : result.emailAddresses[0].emailAddress,
    };
    return user;
});
exports.UserService = {
    getUserById
};
