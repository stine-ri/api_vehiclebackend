"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsSchema = void 0;
const zod_1 = require("zod");
exports.LocationsSchema = zod_1.z.object({
    "name": zod_1.z.string(),
    "address": zod_1.z.string(),
    "contact_phone": zod_1.z.string(),
});
