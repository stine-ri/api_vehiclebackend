"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetManagementRouter = void 0;
const hono_1 = require("hono");
const FleetManagement_controller_1 = require("./FleetManagement.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.FleetManagementRouter = new hono_1.Hono();
//get all FleetManagement
exports.FleetManagementRouter.get("/FleetManagement", FleetManagement_controller_1.listFleetManagement);
//get a single FleetManagement   api/FleetManagement/1
exports.FleetManagementRouter.get("/FleetManagement/:id", FleetManagement_controller_1.getFleetManagement);
// create a FleetManagement 
exports.FleetManagementRouter.post("/FleetManagement", (0, zod_validator_1.zValidator)('json', validator_1.FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), FleetManagement_controller_1.createFleetManagement);
//update a FleetManagement
exports.FleetManagementRouter.put("/FleetManagement/:id", FleetManagement_controller_1.updateFleetManagement);
exports.FleetManagementRouter.delete("/FleetManagement/:id", FleetManagement_controller_1.deleteFleetManagement);
//get FleetManagement by author
// FleetManagementRouter.get("/FleetManagement/author/:author", getAllFleetManagementByAuthor)
