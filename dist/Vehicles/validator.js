"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesSchema = void 0;
const zod_1 = require("zod");
exports.VehiclesSchema = zod_1.z.object({
    vehicleSpec_id: zod_1.z.number(),
    rental_rate: zod_1.z.number(),
    availability: zod_1.z.boolean(),
});
