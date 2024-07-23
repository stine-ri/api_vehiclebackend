"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocation = exports.listLocations = void 0;
const Locations_service_1 = require("./Locations.service");
const listLocations = async (c) => {
    try {
        //limit the number of Locations to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Locations_service_1.LocationsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Location not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listLocations = listLocations;
const getLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Location = await (0, Locations_service_1.getLocationservice)(id);
    if (Location == undefined) {
        return c.text("Location not found", 404);
    }
    return c.json(Location, 200);
};
exports.getLocation = getLocation;
const createLocation = async (c) => {
    try {
        const Location = await c.req.json();
        // const password=Location.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Location.password=hashedPassword;
        const createdLocation = await (0, Locations_service_1.createLocationservice)(Location);
        if (!createdLocation)
            return c.text("Location not created", 404);
        return c.json({ msg: createdLocation }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLocation = createLocation;
const updateLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Location = await c.req.json();
    try {
        // search for the Location
        const searchedLocation = await (0, Locations_service_1.getLocationservice)(id);
        if (searchedLocation == undefined)
            return c.text("Location not found", 404);
        // get the data and update it
        const res = await (0, Locations_service_1.updateLocationservice)(id, Location);
        // return a success message
        if (!res)
            return c.text("Location not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLocation = updateLocation;
const deleteLocation = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the Location
        const Location = await (0, Locations_service_1.getLocationservice)(id);
        if (Location == undefined)
            return c.text("Location not found", 404);
        //deleting the Location
        const res = await (0, Locations_service_1.deleteLocationservice)(id);
        if (!res)
            return c.text("Location not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocation = deleteLocation;
// //get all Locations by author
// export const getAllLocationsByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for Location
//         const Locations = await getLocationsByAuthor(author);
//         if (Locations === null) return c.text("Locations not found", 404);
//         return c.json(Locations, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }
