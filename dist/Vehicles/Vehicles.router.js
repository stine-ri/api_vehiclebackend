"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRouter = void 0;
const hono_1 = require("hono");
const Vehicles_controller_1 = require("./Vehicles.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.VehicleRouter = new hono_1.Hono();
//get all Vehicles
exports.VehicleRouter.get("/Vehicles", Vehicles_controller_1.listVehicles);
//get a single Vehicle   api/Vehicles/1
exports.VehicleRouter.get("/Vehicles/:id", Vehicles_controller_1.getVehicle);
// create a Vehicle 
exports.VehicleRouter.post("/Vehicles", (0, zod_validator_1.zValidator)('json', validator_1.VehiclesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Vehicles_controller_1.createVehicle);
//update a Vehicle
exports.VehicleRouter.put("/Vehicles/:id", Vehicles_controller_1.updateVehicle);
exports.VehicleRouter.delete("/Vehicles/:id", Vehicles_controller_1.deleteVehicle);
//get Vehicles by author
// VehicleRouter.get("/Vehicles/author/:author", getAllVehiclesByAuthor)
