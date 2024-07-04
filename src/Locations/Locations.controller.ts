
import { Context } from "hono";
import { LocationsService, getLocationservice, createLocationservice, updateLocationservice, deleteLocationservice,} from "./Locations.service";
import*as bcrypt from "bcrypt";
export const listLocations = async (c: Context) => {
    try {
        //limit the number of Locations to be returned

        const limit = Number(c.req.query('limit'))

        const data = await LocationsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Location not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Location = await getLocationservice(id);
    if (Location == undefined) {
        return c.text("Location not found", 404);
    }
    return c.json(Location, 200);
}
export const createLocation = async (c: Context) => {
    try {
        const Location = await c.req.json();
        // const password=Location.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Location.password=hashedPassword;
        const createdLocation = await createLocationservice(Location);


        if (!createdLocation) return c.text("Location not created", 404);
        return c.json({ msg: createdLocation }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Location = await c.req.json();
    try {
        // search for the Location
        const searchedLocation= await getLocationservice(id);
        if (searchedLocation == undefined) return c.text("Location not found", 404);
        // get the data and update it
        const res = await updateLocationservice(id, Location);
        // return a success message
        if (!res) return c.text("Location not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteLocation = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Location
        const Location = await getLocationservice(id);
        if (Location== undefined) return c.text("Location not found", 404);
        //deleting the Location
        const res = await deleteLocationservice(id);
        if (!res) return c.text("Location not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
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