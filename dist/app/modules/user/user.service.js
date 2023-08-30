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
const envConfig_1 = __importDefault(require("../../../config/envConfig"));
const user_model_1 = require("./user.model");
const getUserByExternalId = (externalId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ externalId });
    return user;
});
const getUserByClerkId = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const clerkApiUrl = `https://api.clerk.dev/v1/users/${clerkId}`;
    const clerkHeaders = {
        Authorization: `Bearer ${envConfig_1.default.clerk_secret_key}`,
    };
    const clerkResponse = yield fetch(clerkApiUrl, { headers: clerkHeaders });
    const clerkData = yield clerkResponse.json();
    const user = {
        externalId: clerkData.id,
        attributes: {
            username: clerkData.username,
            image_url: clerkData.image_url,
            last_name: clerkData.last_name,
            first_name: clerkData.first_name,
            created_at: clerkData.created_at,
            updated_at: clerkData.updated_at,
            external_id: clerkData.external_id,
            email_addresses: clerkData.email_addresses,
        },
    };
    return clerkData.errors ? null : user;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ externalId: payload.externalId }, payload, { upsert: true, new: true, setDefaultsOnInsert: true });
    return user;
});
const upsertUser = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const clerkData = yield getUserByClerkId(clerkId);
    if (!clerkData)
        return null;
    const user = yield user_model_1.User.findOneAndUpdate({ externalId: clerkData.externalId }, clerkData, { upsert: true, new: true, setDefaultsOnInsert: true });
    return user;
});
exports.UserService = {
    getUserByExternalId,
    getUserByClerkId,
    createUser,
    upsertUser,
};
