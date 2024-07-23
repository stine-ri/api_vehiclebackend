"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRouter = void 0;
const hono_1 = require("hono");
const Locations_controller_1 = require("./Locations.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.LocationRouter = new hono_1.Hono();
//get all Locations
exports.LocationRouter.get("/Locations", Locations_controller_1.listLocations);
//get a single Location   api/Locations/1
exports.LocationRouter.get("/Locations/:id", Locations_controller_1.getLocation);
// create a Location 
exports.LocationRouter.post("/Locations", (0, zod_validator_1.zValidator)('json', validator_1.LocationsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Locations_controller_1.createLocation);
//update a Location
exports.LocationRouter.put("/Locations/:id", Locations_controller_1.updateLocation);
exports.LocationRouter.delete("/Locations/:id", Locations_controller_1.deleteLocation);
//get Locations by author
// LocationRouter.get("/Locations/author/:author", getAllLocationsByAuthor)
