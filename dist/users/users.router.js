"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.userRouter = new hono_1.Hono();
//get all users
//,adminRoleAuth
exports.userRouter.get("/users", users_controller_1.listUsers);
//get a single user   api/users/1
exports.userRouter.get("/users/:id", users_controller_1.getUser);
// create a user 
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)('json', validator_1.usersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), users_controller_1.createUser);
//update a user
exports.userRouter.put("/users/:id", users_controller_1.updateUser);
exports.userRouter.delete("/users/:id", users_controller_1.deleteUser);
