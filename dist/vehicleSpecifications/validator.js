"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationSchema = void 0;
const zod_1 = require("zod");
exports.vehicleSpecificationSchema = zod_1.z.object({
    manufacturer: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    fuelType: zod_1.z.string(),
    engineCapacity: zod_1.z.string(),
    transmission: zod_1.z.string(),
    seatingCapacity: zod_1.z.number(),
    color: zod_1.z.string(),
    features: zod_1.z.string(),
});
