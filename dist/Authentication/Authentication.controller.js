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
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const Authentication_service_1 = require("./Authentication.service");
const bycrpt = __importStar(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const registerUser = async (c) => {
    try {
        console.log(await c.req.json());
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, Authentication_service_1.createAuthUserService)(user);
        if (!createdUser)
            return c.text("User exit do you want to login?", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        console.log("hey");
        const user = await c.req.json();
        //check user exist
        // console.log(user)
        const userExist = await (0, Authentication_service_1.userLoginService)(user);
        // console.log(userExist)
        if (userExist === null)
            return c.json({ error: "User not found" }, 404); // not found        
        const userMatch = await bycrpt.compare(user.password, userExist?.password);
        // console.log(userMatch)
        if (!userMatch) {
            return c.json({ error: "invalid login details!!!" }, 401); // unauthorized
        }
        else {
            // create a payload
            const payload = {
                sub: userExist?.user,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)
                // 3 hour  => SESSION EXPIRATION
            };
            // console.log(payload)
            console.log(process.env.JWT_SECRET);
            let secret = process.env.JWT_SECRET; // secret key
            // console.log(secret); //
            const token = await (0, jwt_1.sign)(payload, secret); // create a JWT token
            let user = userExist?.user;
            let role = userExist?.role;
            return c.json({ token, user: { role, user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
