
import { Context } from "hono";
import { FleetManagementService, getFleetManagementervice, createFleetManagementService, updateFleetManagementService, deleteFleetManagementervice,} from "./FleetManagement.service";
import*as bcrypt from "bcrypt";
export const listFleetManagement = async (c: Context) => {
    try {
        //limit the number of FleetManagement to be returned

        const limit = Number(c.req.query('limit'))

        const data = await FleetManagementService(limit);
        if (data == null || data.length == 0) {
            return c.text("FleetManagement not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await getFleetManagementervice(id);
    if (FleetManagement == undefined) {
        return c.text("FleetManagement not found", 404);
    }
    return c.json(FleetManagement, 200);
}
export const createFleetManagement = async (c: Context) => {
    try {
        const FleetManagement = await c.req.json();
        // const password=FleetManagement.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // FleetManagement.password=hashedPassword;
        const createdFleetManagement = await createFleetManagementService(FleetManagement);


        if (!createdFleetManagement) return c.text("FleetManagement not created", 404);
        return c.json({ msg: createdFleetManagement }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await c.req.json();
    try {
        // search for the FleetManagement
        const searchedFleetManagement= await getFleetManagementervice(id);
        if (searchedFleetManagement == undefined) return c.text("FleetManagement not found", 404);
        // get the data and update it
        const res = await updateFleetManagementService(id, FleetManagement);
        // return a success message
        if (!res) return c.text("FleetManagement not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteFleetManagement = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the FleetManagement
        const FleetManagement = await getFleetManagementervice(id);
        if (FleetManagement== undefined) return c.text("FleetManagement not found", 404);
        //deleting the FleetManagement
        const res = await deleteFleetManagementervice(id);
        if (!res) return c.text("FleetManagement not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
// //get all FleetManagement by author
// export const getAllFleetManagementByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for FleetManagement
//         const FleetManagement = await getFleetManagementByAuthor(author);
//         if (FleetManagement === null) return c.text("FleetManagement not found", 404);
//         return c.json(FleetManagement, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }