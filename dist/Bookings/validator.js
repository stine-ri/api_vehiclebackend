"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsSchema = void 0;
const zod_1 = require("zod");
exports.BookingsSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    vehicle_id: zod_1.z.number(),
    location_id: zod_1.z.number(),
    booking_date: zod_1.z.string(),
    return_date: zod_1.z.string(),
    total_amount: zod_1.z.string(),
    booking_status: zod_1.z.string()
});
