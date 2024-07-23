"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetManagementSchema = void 0;
const zod_1 = require("zod");
exports.FleetManagementSchema = zod_1.z.object({
    vehicle_id: zod_1.z.number(),
    acquisition_date: zod_1.z.string(),
    depreciation_rate: zod_1.z.number(),
    current_value: zod_1.z.number(),
    maintenance_cost: zod_1.z.number(),
    status: zod_1.z.string(),
});
