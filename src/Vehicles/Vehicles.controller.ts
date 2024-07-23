
import { Context } from "hono";
import { VehiclesService, getVehicleservice, createVehicleservice, updateVehicleservice, deleteVehicleservice,} from "./vehicles.service";
import*as bcrypt from "bcrypt";
export const listVehicles = async (c: Context) => {
    try {
        //limit the number of Vehicles to be returned

        const limit = Number(c.req.query('limit'))

        const data = await VehiclesService(limit);
        if (data == null || data.length == 0) {
            return c.text("Vehicle not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const vehicle = await getVehicleservice(id);
        console.log('Fetched Vehicle:', vehicle); // Log the fetched vehicle for debugging
        if (!vehicle) {
            return c.json({ success: false, message: "Vehicle not found" }, 404);
        }
        return c.json({ success: true, data: vehicle }, 200); // Wrap vehicle in a success response
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return c.json({ success: false, message: 'Server error' }, 500);
    }
};
export const createVehicle = async (c: Context) => {
    try {
        const Vehicle = await c.req.json();
        // const password=Vehicle.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Vehicle.password=hashedPassword;
        const createdVehicle = await createVehicleservice(Vehicle);


        if (!createdVehicle) return c.text("Vehicle not created", 404);
        return c.json({ msg: createdVehicle }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Vehicle = await c.req.json();
    try {
        // search for the Vehicle
        const searchedVehicle= await getVehicleservice(id);
        if (searchedVehicle == undefined) return c.text("Vehicle not found", 404);
        // get the data and update it
        const res = await updateVehicleservice(id, Vehicle);
        // return a success message
        if (!res) return c.text("Vehicle not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Vehicle
        const Vehicle = await getVehicleservice(id);
        if (Vehicle== undefined) return c.text("Vehicle not found", 404);
        //deleting the Vehicle
        const res = await deleteVehicleservice(id);
        if (!res) return c.text("Vehicle not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
// //get all Vehicles by author
// export const getAllVehiclesByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for Vehicle
//         const Vehicles = await getVehiclesByAuthor(author);
//         if (Vehicles === null) return c.text("Vehicles not found", 404);
//         return c.json(Vehicles, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }