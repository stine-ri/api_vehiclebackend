"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSupportTicketsSchema = void 0;
const zod_1 = require("zod");
exports.CustomerSupportTicketsSchema = zod_1.z.object({
    subject: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.string(),
});
