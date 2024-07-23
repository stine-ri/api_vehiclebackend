"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = exports.usersSchema = void 0;
const zod_1 = require("zod");
exports.usersSchema = zod_1.z.object({
    // user_id: z.number(),
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string(),
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.registerUserSchema = zod_1.z.object({
    // user_id: z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    // role: z.string().optional(),
    role: zod_1.z.enum(["admin", "user",])
});
