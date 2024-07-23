"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementervice = exports.updateFleetManagementService = exports.createFleetManagementService = exports.getFleetManagementervice = exports.FleetManagementService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const FleetManagementService = async (limit) => {
    if (limit) {
        return await db_1.default.query.FleetManagement.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.FleetManagement.findMany();
};
exports.FleetManagementService = FleetManagementService;
const getFleetManagementervice = async (id) => {
    return await db_1.default.query.FleetManagement.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.FleetManagement.fleet_id, id)
    });
};
exports.getFleetManagementervice = getFleetManagementervice;
const createFleetManagementService = async (data) => {
    await db_1.default.insert(schema_1.FleetManagement).values(data);
    return "FleetManagement created successfully";
};
exports.createFleetManagementService = createFleetManagementService;
const updateFleetManagementService = async (id, data) => {
    await db_1.default.update(schema_1.FleetManagement)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.FleetManagement.fleet_id, id));
    return "FleetManagement updated successfully";
};
exports.updateFleetManagementService = updateFleetManagementService;
const deleteFleetManagementervice = async (id) => {
    await db_1.default.delete(schema_1.FleetManagement).where((0, drizzle_orm_1.eq)(schema_1.FleetManagement.fleet_id, id));
    return "FleetManagement deleted successfully";
};
exports.deleteFleetManagementervice = deleteFleetManagementervice;
// GET FleetManagement BY AUTHOR
//  export const getFleetManagementByAuthor = async (author: string): Promise<TIFleetManagement[] | null> => {
//     return await db.query.FleetManagement.findMany({
//         where: eq(FleetManagement.author, author)
//     })
// }
