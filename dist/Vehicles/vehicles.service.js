"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleservice = exports.updateVehicleservice = exports.createVehicleservice = exports.getVehicleservice = exports.VehiclesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const VehiclesService = async (limit) => {
    if (limit) {
        return await db_1.default.query.Vehicles.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.Vehicles.findMany();
};
exports.VehiclesService = VehiclesService;
const getVehicleservice = async (id) => {
    try {
        const vehicle = await db_1.default.query.Vehicles.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.Vehicles.id, id)
        });
        console.log('Fetched Vehicle:', vehicle); // Log the fetched vehicle for debugging
        return vehicle;
    }
    catch (error) {
        console.error('Error fetching vehicle from service:', error);
        throw error;
    }
};
exports.getVehicleservice = getVehicleservice;
const createVehicleservice = async (Vehicle) => {
    await db_1.default.insert(schema_1.Vehicles).values(Vehicle);
    return "Vehicle created successfully";
};
exports.createVehicleservice = createVehicleservice;
const updateVehicleservice = async (id, Vehicle) => {
    await db_1.default.update(schema_1.Vehicles).set(Vehicle).where((0, drizzle_orm_1.eq)(schema_1.Vehicles.id, id));
    return "Vehicle updated successfully";
};
exports.updateVehicleservice = updateVehicleservice;
const deleteVehicleservice = async (id) => {
    await db_1.default.delete(schema_1.Vehicles).where((0, drizzle_orm_1.eq)(schema_1.Vehicles.id, id));
    return "Vehicle deleted successfully";
};
exports.deleteVehicleservice = deleteVehicleservice;
// GET Vehicles BY AUTHOR
//  export const getVehiclesByAuthor = async (author: string): Promise<TIVehicles[] | null> => {
//     return await db.query.Vehicles.findMany({
//         where: eq(Vehicles.author, author)
//     })
// }
