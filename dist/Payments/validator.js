"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsSchema = void 0;
const zod_1 = require("zod");
exports.PaymentsSchema = zod_1.z.object({
    amount: zod_1.z.number(),
    payment_status: zod_1.z.string(),
    payment_date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    payment_method: zod_1.z.string(),
    transaction_id: zod_1.z.string(),
});
