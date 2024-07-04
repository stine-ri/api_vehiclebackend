
import { Context } from "hono";
import { vehicleSpecificationsService, getvehicleSpecificationservice, createVehicleSpecificationService, updateVehicleSpecificationService, deletevehicleSpecificationservice,} from "./vehicleSpecifications.service";
import*as bcrypt from "bcrypt";
export const listvehicleSpecifications = async (c: Context) => {
    try {
        //limit the number of vehicleSpecifications to be returned

        const limit = Number(c.req.query('limit'))

        const data = await vehicleSpecificationsService(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicleSpecification not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getvehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleSpecification = await getvehicleSpecificationservice(id);
    if (vehicleSpecification == undefined) {
        return c.text("vehicleSpecification not found", 404);
    }
    return c.json(vehicleSpecification, 200);
}
export const createvehicleSpecification = async (c: Context) => {
    try {
        const vehicleSpecification = await c.req.json();
        // const password=vehicleSpecification.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // vehicleSpecification.password=hashedPassword;
        const createdvehicleSpecification = await createVehicleSpecificationService(vehicleSpecification);


        if (!createdvehicleSpecification) return c.text("vehicleSpecification not created", 404);
        return c.json({ msg: createdvehicleSpecification }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatevehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleSpecification = await c.req.json();
    try {
        // search for the vehicleSpecification
        const searchedvehicleSpecification= await getvehicleSpecificationservice(id);
        if (searchedvehicleSpecification == undefined) return c.text("vehicleSpecification not found", 404);
        // get the data and update it
        const res = await updateVehicleSpecificationService(id, vehicleSpecification);
        // return a success message
        if (!res) return c.text("vehicleSpecification not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletevehicleSpecification = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the vehicleSpecification
        const vehicleSpecification = await getvehicleSpecificationservice(id);
        if (vehicleSpecification== undefined) return c.text("vehicleSpecification not found", 404);
        //deleting the vehicleSpecification
        const res = await deletevehicleSpecificationservice(id);
        if (!res) return c.text("vehicleSpecification not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
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