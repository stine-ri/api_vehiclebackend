"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationsRouter = void 0;
const hono_1 = require("hono");
const vehicleSpecifications_controller_1 = require("./vehicleSpecifications.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.vehicleSpecificationsRouter = new hono_1.Hono();
// Get all vehicle specifications
exports.vehicleSpecificationsRouter.get("/vehicleSpecifications", vehicleSpecifications_controller_1.listvehicleSpecifications);
// Get a single vehicle specification
exports.vehicleSpecificationsRouter.get("/vehicleSpecifications/:id", vehicleSpecifications_controller_1.getvehicleSpecification);
// Create a vehicle specification
exports.vehicleSpecificationsRouter.post("/vehicleSpecifications", (0, zod_validator_1.zValidator)('json', validator_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), vehicleSpecifications_controller_1.createvehicleSpecification);
// Update a vehicle specification
exports.vehicleSpecificationsRouter.put("/vehicleSpecifications/:id", vehicleSpecifications_controller_1.updatevehicleSpecification);
// Delete a vehicle specification
exports.vehicleSpecificationsRouter.delete("/vehicleSpecifications/:id", vehicleSpecifications_controller_1.deletevehicleSpecification);
