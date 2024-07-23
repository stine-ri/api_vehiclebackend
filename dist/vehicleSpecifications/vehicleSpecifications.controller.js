"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletevehicleSpecification = exports.updatevehicleSpecification = exports.createvehicleSpecification = exports.getvehicleSpecification = exports.listvehicleSpecifications = void 0;
const vehicleSpecifications_service_1 = require("./vehicleSpecifications.service");
const listvehicleSpecifications = async (c) => {
    try {
        //limit the number of vehicleSpecifications to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicleSpecifications_service_1.vehicleSpecificationsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicleSpecification not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listvehicleSpecifications = listvehicleSpecifications;
const getvehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await (0, vehicleSpecifications_service_1.getvehicleSpecificationservice)(id);
    if (vehicleSpecification == undefined) {
        return c.text("vehicleSpecification not found", 404);
    }
    return c.json(vehicleSpecification, 200);
};
exports.getvehicleSpecification = getvehicleSpecification;
const createvehicleSpecification = async (c) => {
    try {
        const vehicleSpecification = await c.req.json();
        // const password=vehicleSpecification.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // vehicleSpecification.password=hashedPassword;
        const createdvehicleSpecification = await (0, vehicleSpecifications_service_1.createVehicleSpecificationService)(vehicleSpecification);
        if (!createdvehicleSpecification)
            return c.text("vehicleSpecification not created", 404);
        return c.json({ msg: createdvehicleSpecification }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createvehicleSpecification = createvehicleSpecification;
const updatevehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await c.req.json();
    try {
        // search for the vehicleSpecification
        const searchedvehicleSpecification = await (0, vehicleSpecifications_service_1.getvehicleSpecificationservice)(id);
        if (searchedvehicleSpecification == undefined)
            return c.text("vehicleSpecification not found", 404);
        // get the data and update it
        const res = await (0, vehicleSpecifications_service_1.updateVehicleSpecificationService)(id, vehicleSpecification);
        // return a success message
        if (!res)
            return c.text("vehicleSpecification not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatevehicleSpecification = updatevehicleSpecification;
const deletevehicleSpecification = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the vehicleSpecification
        const vehicleSpecification = await (0, vehicleSpecifications_service_1.getvehicleSpecificationservice)(id);
        if (vehicleSpecification == undefined)
            return c.text("vehicleSpecification not found", 404);
        //deleting the vehicleSpecification
        const res = await (0, vehicleSpecifications_service_1.deletevehicleSpecificationservice)(id);
        if (!res)
            return c.text("vehicleSpecification not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletevehicleSpecification = deletevehicleSpecification;
// //get all vehicleSpecifications by author
// export const getAllvehicleSpecificationsByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for vehicleSpecification
//         const vehicleSpecifications = await getvehicleSpecificationsByAuthor(author);
//         if (vehicleSpecifications === null) return c.text("vehicleSpecifications not found", 404);
//         return c.json(vehicleSpecifications, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }
