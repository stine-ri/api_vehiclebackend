"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTickets = exports.updateCustomerSupportTickets = exports.createCustomerSupportTickets = exports.getCustomerSupportTickets = exports.listCustomerSupportTickets = void 0;
const CustomerSupportTickets_service_1 = require("./CustomerSupportTickets.service");
const listCustomerSupportTickets = async (c) => {
    try {
        //limit the number of CustomerSupportTickets to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, CustomerSupportTickets_service_1.CustomerSupportTicketsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("CustomerSupportTickets not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCustomerSupportTickets = listCustomerSupportTickets;
const getCustomerSupportTickets = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const CustomerSupportTickets = await (0, CustomerSupportTickets_service_1.getCustomerSupportTicketservice)(id);
    if (CustomerSupportTickets == undefined) {
        return c.text("CustomerSupportTickets not found", 404);
    }
    return c.json(CustomerSupportTickets, 200);
};
exports.getCustomerSupportTickets = getCustomerSupportTickets;
const createCustomerSupportTickets = async (c) => {
    try {
        const CustomerSupportTickets = await c.req.json();
        // const password=CustomerSupportTickets.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // CustomerSupportTickets.password=hashedPassword;
        const createdCustomerSupportTickets = await (0, CustomerSupportTickets_service_1.createCustomerSupportTicketservice)(CustomerSupportTickets);
        if (!createdCustomerSupportTickets)
            return c.text("CustomerSupportTickets not created", 404);
        return c.json({ msg: createdCustomerSupportTickets }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCustomerSupportTickets = createCustomerSupportTickets;
const updateCustomerSupportTickets = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const CustomerSupportTickets = await c.req.json();
    try {
        // search for the CustomerSupportTickets
        const searchedCustomerSupportTickets = await (0, CustomerSupportTickets_service_1.getCustomerSupportTicketservice)(id);
        if (searchedCustomerSupportTickets == undefined)
            return c.text("CustomerSupportTickets not found", 404);
        // get the data and update it
        const res = await (0, CustomerSupportTickets_service_1.updateCustomerSupportTicketservice)(id, CustomerSupportTickets);
        // return a success message
        if (!res)
            return c.text("CustomerSupportTickets not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCustomerSupportTickets = updateCustomerSupportTickets;
const deleteCustomerSupportTickets = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the CustomerSupportTickets
        const CustomerSupportTickets = await (0, CustomerSupportTickets_service_1.getCustomerSupportTicketservice)(id);
        if (CustomerSupportTickets == undefined)
            return c.text("CustomerSupportTickets not found", 404);
        //deleting the CustomerSupportTickets
        const res = await (0, CustomerSupportTickets_service_1.deleteCustomerSupportTicketservice)(id);
        if (!res)
            return c.text("CustomerSupportTickets not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCustomerSupportTickets = deleteCustomerSupportTickets;
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
