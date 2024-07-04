
import { Context } from "hono";
import { AuthenticationService, getAuthenticationervice, createAuthenticationService, updateAuthenticationService, deleteAuthenticationervice,} from "./Authentication.service";
import*as bcrypt from "bcrypt";
export const listAuthentication = async (c: Context) => {
    try {
        //limit the number of Authentication to be returned

        const limit = Number(c.req.query('limit'))

        const data = await AuthenticationService(limit);
        if (data == null || data.length == 0) {
            return c.text("Authentication not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getAuthentication = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Authentication = await getAuthenticationervice(id);
    if (Authentication == undefined) {
        return c.text("Authentication not found", 404);
    }
    return c.json(Authentication, 200);
}
export const createAuthentication = async (c: Context) => {
    try {
        const Authentication = await c.req.json();
        // const password=Authentication.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Authentication.password=hashedPassword;
        const createdAuthentication = await createAuthenticationService(Authentication);


        if (!createdAuthentication) return c.text("Authentication not created", 404);
        return c.json({ msg: createdAuthentication }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateAuthentication = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Authentication = await c.req.json();
    try {
        // search for the Authentication
        const searchedAuthentication= await getAuthenticationervice(id);
        if (searchedAuthentication == undefined) return c.text("Authentication not found", 404);
        // get the data and update it
        const res = await updateAuthenticationService(id, Authentication);
        // return a success message
        if (!res) return c.text("Authentication not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteAuthentication = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Authentication
        const Authentication = await getAuthenticationervice(id);
        if (Authentication== undefined) return c.text("Authentication not found", 404);
        //deleting the Authentication
        const res = await deleteAuthenticationervice(id);
        if (!res) return c.text("Authentication not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
// //get all Authentication by author
// export const getAllAuthenticationByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for Authentication
//         const Authentication = await getAuthenticationByAuthor(author);
//         if (Authentication === null) return c.text("Authentication not found", 404);
//         return c.json(Authentication, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }