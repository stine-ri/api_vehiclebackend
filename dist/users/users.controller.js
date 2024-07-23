"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.listUsers = void 0;
const users_service_1 = require("./users.service");
const bcrypt = __importStar(require("bcrypt"));
const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, users_service_1.usersService)(limit);
        if (data == null || data.length == 0) {
            return c.text("user not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listUsers = listUsers;
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, users_service_1.getuserservice)(id);
    if (user == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const password = user.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        const createduser = await (0, users_service_1.createuserservice)(user);
        if (!createduser)
            return c.text("user not created", 404);
        return c.json({ msg: createduser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searcheduser = await (0, users_service_1.getuserservice)(id);
        if (searcheduser == undefined)
            return c.text("user not found", 404);
        // get the data and update it
        const res = await (0, users_service_1.updateuserservice)(id, user);
        // return a success message
        if (!res)
            return c.text("user not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, users_service_1.getuserservice)(id);
        if (user == undefined)
            return c.text("user not found", 404);
        //deleting the user
        const res = await (0, users_service_1.deleteuserservice)(id);
        if (!res)
            return c.text("user not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
