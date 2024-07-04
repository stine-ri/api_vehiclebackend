
import { Hono } from "hono";
import { listCustomerSupportTickets, getCustomerSupportTickets, createCustomerSupportTickets, updateCustomerSupportTickets, deleteCustomerSupportTickets, } from "./CustomerSupportTickets.controller"
import { zValidator } from "@hono/zod-validator";
import { CustomerSupportTicketsSchema } from "./validator"; 

export const CustomerSupportTicketRouter = new Hono();
//get all CustomerSupportTickets

CustomerSupportTicketRouter.get("/CustomerSupportTickets", listCustomerSupportTickets)
//get a single CustomerSupportTickets   api/CustomerSupportTickets/1
CustomerSupportTicketRouter.get("/CustomerSupportTickets/:id", getCustomerSupportTickets)
// create a CustomerSupportTickets 
CustomerSupportTicketRouter.post("/CustomerSupportTickets", zValidator('json', CustomerSupportTicketsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCustomerSupportTickets)
//update a CustomerSupportTickets
CustomerSupportTicketRouter.put("/CustomerSupportTickets/:id", updateCustomerSupportTickets) 

CustomerSupportTicketRouter.delete("/CustomerSupportTickets/:id", deleteCustomerSupportTickets)

//get CustomerSupportTickets by author

// CustomerSupportTicketsRouter.get("/CustomerSupportTickets/author/:author", getAllCustomerSupportTicketsByAuthor)
