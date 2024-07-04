
import { Context } from "hono";
import { CustomerSupportTicketsService, getCustomerSupportTicketservice, createCustomerSupportTicketservice, updateCustomerSupportTicketservice, deleteCustomerSupportTicketservice,} from "./CustomerSupportTickets.service";
import*as bcrypt from "bcrypt";
export const listCustomerSupportTickets = async (c: Context) => {
    try {
        //limit the number of CustomerSupportTickets to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CustomerSupportTicketsService(limit);
        if (data == null || data.length == 0) {
            return c.text("CustomerSupportTickets not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCustomerSupportTickets = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTickets = await getCustomerSupportTicketservice(id);
    if (CustomerSupportTickets == undefined) {
        return c.text("CustomerSupportTickets not found", 404);
    }
    return c.json(CustomerSupportTickets, 200);
}
export const createCustomerSupportTickets = async (c: Context) => {
    try {
        const CustomerSupportTickets = await c.req.json();
        // const password=CustomerSupportTickets.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // CustomerSupportTickets.password=hashedPassword;
        const createdCustomerSupportTickets = await createCustomerSupportTicketservice(CustomerSupportTickets);


        if (!createdCustomerSupportTickets) return c.text("CustomerSupportTickets not created", 404);
        return c.json({ msg: createdCustomerSupportTickets }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCustomerSupportTickets = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTickets = await c.req.json();
    try {
        // search for the CustomerSupportTickets
        const searchedCustomerSupportTickets= await getCustomerSupportTicketservice(id);
        if (searchedCustomerSupportTickets == undefined) return c.text("CustomerSupportTickets not found", 404);
        // get the data and update it
        const res = await updateCustomerSupportTicketservice(id, CustomerSupportTickets);
        // return a success message
        if (!res) return c.text("CustomerSupportTickets not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCustomerSupportTickets = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the CustomerSupportTickets
        const CustomerSupportTickets = await getCustomerSupportTicketservice(id);
        if (CustomerSupportTickets== undefined) return c.text("CustomerSupportTickets not found", 404);
        //deleting the CustomerSupportTickets
        const res = await deleteCustomerSupportTicketservice(id);
        if (!res) return c.text("CustomerSupportTickets not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
// //get all CustomerSupportTickets by author
// export const getAllCustomerSupportTicketsByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for CustomerSupportTickets
//         const CustomerSupportTickets = await getCustomerSupportTicketsByAuthor(author);
//         if (CustomerSupportTickets === null) return c.text("CustomerSupportTickets not found", 404);
//         return c.json(CustomerSupportTickets, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }