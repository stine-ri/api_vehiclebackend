"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSupportTicketRouter = void 0;
const hono_1 = require("hono");
const CustomerSupportTickets_controller_1 = require("./CustomerSupportTickets.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.CustomerSupportTicketRouter = new hono_1.Hono();
//get all CustomerSupportTickets
exports.CustomerSupportTicketRouter.get("/CustomerSupportTickets", CustomerSupportTickets_controller_1.listCustomerSupportTickets);
//get a single CustomerSupportTickets   api/CustomerSupportTickets/1
exports.CustomerSupportTicketRouter.get("/CustomerSupportTickets/:id", CustomerSupportTickets_controller_1.getCustomerSupportTickets);
// create a CustomerSupportTickets 
exports.CustomerSupportTicketRouter.post("/CustomerSupportTickets", (0, zod_validator_1.zValidator)('json', validator_1.CustomerSupportTicketsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), CustomerSupportTickets_controller_1.createCustomerSupportTickets);
//update a CustomerSupportTickets
exports.CustomerSupportTicketRouter.put("/CustomerSupportTickets/:id", CustomerSupportTickets_controller_1.updateCustomerSupportTickets);
exports.CustomerSupportTicketRouter.delete("/CustomerSupportTickets/:id", CustomerSupportTickets_controller_1.deleteCustomerSupportTickets);
//get CustomerSupportTickets by author
// CustomerSupportTicketsRouter.get("/CustomerSupportTickets/author/:author", getAllCustomerSupportTicketsByAuthor)
