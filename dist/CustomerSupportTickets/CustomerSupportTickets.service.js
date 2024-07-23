"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicketservice = exports.updateCustomerSupportTicketservice = exports.createCustomerSupportTicketservice = exports.getCustomerSupportTicketservice = exports.CustomerSupportTicketsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const CustomerSupportTicketsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.CustomerSupportTickets.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.CustomerSupportTickets.findMany();
};
exports.CustomerSupportTicketsService = CustomerSupportTicketsService;
const getCustomerSupportTicketservice = async (id) => {
    return await db_1.default.query.CustomerSupportTickets.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerSupportTickets.ticket_id, id)
    });
};
exports.getCustomerSupportTicketservice = getCustomerSupportTicketservice;
const createCustomerSupportTicketservice = async (customerSupportTickets) => {
    try {
        console.log("Inserting customer support ticket:", customerSupportTickets);
        await db_1.default.insert(schema_1.CustomerSupportTickets).values(customerSupportTickets);
        console.log("Insertion successful");
        return "Customer Support Ticket created successfully";
    }
    catch (error) {
        console.error("Error creating customer support ticket:", error);
        throw new Error("Failed to create customer support ticket");
    }
};
exports.createCustomerSupportTicketservice = createCustomerSupportTicketservice;
const updateCustomerSupportTicketservice = async (id, customerSupportTickets) => {
    try {
        console.log("Updating customer support ticket with ID:", id);
        console.log("Update data:", customerSupportTickets);
        await db_1.default.update(schema_1.CustomerSupportTickets)
            .set(customerSupportTickets)
            .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTickets.ticket_id, id));
        console.log("Update successful");
        return "Customer Support Ticket updated successfully";
    }
    catch (error) {
        console.error("Error updating customer support ticket:", error);
        throw new Error("Failed to update customer support ticket");
    }
};
exports.updateCustomerSupportTicketservice = updateCustomerSupportTicketservice;
const deleteCustomerSupportTicketservice = async (id) => {
    await db_1.default.delete(schema_1.CustomerSupportTickets).where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTickets.ticket_id, id));
    return "CustomerSupportTickets deleted successfully";
};
exports.deleteCustomerSupportTicketservice = deleteCustomerSupportTicketservice;
// GET CustomerSupportTickets BY AUTHOR
//  export const getCustomerSupportTicketsByAuthor = async (author: string): Promise<TICustomerSupportTickets[] | null> => {
//     return await db.query.CustomerSupportTickets.findMany({
//         where: eq(CustomerSupportTickets.author, author)
//     })
// }
