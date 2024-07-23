"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuserservice = exports.updateuserservice = exports.createuserservice = exports.getuserservice = exports.usersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const usersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.users.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.users.findMany();
};
exports.usersService = usersService;
const getuserservice = async (id) => {
    return await db_1.default.query.users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.users.id, id)
    });
};
exports.getuserservice = getuserservice;
const createuserservice = async (user) => {
    await db_1.default.insert(schema_1.users).values(user);
    return "user created successfully";
};
exports.createuserservice = createuserservice;
const updateuserservice = async (id, user) => {
    await db_1.default.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "user updated successfully";
};
exports.updateuserservice = updateuserservice;
const deleteuserservice = async (id) => {
    await db_1.default.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "user deleted successfully";
};
exports.deleteuserservice = deleteuserservice;
