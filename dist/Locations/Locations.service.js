"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationservice = exports.updateLocationservice = exports.createLocationservice = exports.getLocationservice = exports.LocationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const LocationsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.Locations.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.Locations.findMany();
};
exports.LocationsService = LocationsService;
const getLocationservice = async (id) => {
    return await db_1.default.query.Locations.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Locations.location_id, id)
    });
};
exports.getLocationservice = getLocationservice;
const createLocationservice = async (Location) => {
    await db_1.default.insert(schema_1.Locations).values(Location);
    return "Location created successfully";
};
exports.createLocationservice = createLocationservice;
const updateLocationservice = async (id, Location) => {
    await db_1.default.update(schema_1.Locations).set(Location).where((0, drizzle_orm_1.eq)(schema_1.Locations.location_id, id));
    return "Location updated successfully";
};
exports.updateLocationservice = updateLocationservice;
const deleteLocationservice = async (id) => {
    await db_1.default.delete(schema_1.Locations).where((0, drizzle_orm_1.eq)(schema_1.Locations.location_id, id));
    return "Location deleted successfully";
};
exports.deleteLocationservice = deleteLocationservice;
// GET Locations BY AUTHOR
//  export const getLocationsByAuthor = async (author: string): Promise<TILocations[] | null> => {
//     return await db.query.Locations.findMany({
//         where: eq(Locations.author, author)
//     })
// }
