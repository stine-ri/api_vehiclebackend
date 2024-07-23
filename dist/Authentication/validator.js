"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contact_phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string().default("user"),
    password: zod_1.z.string(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
