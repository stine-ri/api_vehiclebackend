"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletevehicleSpecificationservice = exports.updateVehicleSpecificationService = exports.createVehicleSpecificationService = exports.getvehicleSpecificationservice = exports.vehicleSpecificationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const vehicleSpecificationsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.VehicleSpecifications.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.VehicleSpecifications.findMany();
};
exports.vehicleSpecificationsService = vehicleSpecificationsService;
const getvehicleSpecificationservice = async (id) => {
    return await db_1.default.query.VehicleSpecifications.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehicleSpecifications.id, id)
    });
};
exports.getvehicleSpecificationservice = getvehicleSpecificationservice;
const createVehicleSpecificationService = async (vehicleSpecification) => {
    await db_1.default.insert(schema_1.VehicleSpecifications).values([vehicleSpecification]);
    return "Vehicle specification created successfully";
};
exports.createVehicleSpecificationService = createVehicleSpecificationService;
const updateVehicleSpecificationService = async (vehicleId, vehicleSpecification) => {
    // Ensure vehicleId is not being updated
    const { id, ...updates } = vehicleSpecification;
    if (vehicleId !== undefined) {
        await db_1.default.update(schema_1.VehicleSpecifications).set(updates).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecifications.id, vehicleId));
        return "Vehicle specification updated successfully";
    }
    else {
        throw new Error("vehicleId is required for updating vehicle specifications");
    }
};
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
const deletevehicleSpecificationservice = async (id) => {
    await db_1.default.delete(schema_1.VehicleSpecifications).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecifications.id, id));
    return "vehicleSpecifications deleted successfully";
};
exports.deletevehicleSpecificationservice = deletevehicleSpecificationservice;
