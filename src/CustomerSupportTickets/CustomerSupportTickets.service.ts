
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICustomerSupportTickets, TSCustomerSupportTickets, CustomerSupportTickets, } from "../drizzle/schema";

export const CustomerSupportTicketsService = async (limit?: number): Promise<TSCustomerSupportTickets[] | null> => {
    if (limit) {
        return await db.query.CustomerSupportTickets.findMany({
            limit: limit
        });
    }
    return await db.query.CustomerSupportTickets.findMany();
}

export const getCustomerSupportTicketservice = async (id: number): Promise<TICustomerSupportTickets | undefined> => {
    return await db.query.CustomerSupportTickets.findFirst({
        where: eq(CustomerSupportTickets.ticket_id, id)
    })
}

export const createCustomerSupportTicketservice = async (customerSupportTickets: TICustomerSupportTickets) => {
    try {
      console.log("Inserting customer support ticket:", customerSupportTickets);
      await db.insert(CustomerSupportTickets).values(customerSupportTickets);
      console.log("Insertion successful");
      return "Customer Support Ticket created successfully";
    } catch (error) {
      console.error("Error creating customer support ticket:", error);
      throw new Error("Failed to create customer support ticket");
    }
  };
  export const updateCustomerSupportTicketservice = async (id: number, customerSupportTickets: Partial<TICustomerSupportTickets>) => {
    try {
      console.log("Updating customer support ticket with ID:", id);
      console.log("Update data:", customerSupportTickets);
  
      await db.update(CustomerSupportTickets)
     .set(customerSupportTickets)
     .where(eq(CustomerSupportTickets.ticket_id, id));

      console.log("Update successful");
      return "Customer Support Ticket updated successfully";
    } catch (error) {
      console.error("Error updating customer support ticket:", error);
      throw new Error("Failed to update customer support ticket");
    }
  };

export const deleteCustomerSupportTicketservice = async (id: number) => {
    await db.delete(CustomerSupportTickets).where(eq(CustomerSupportTickets.ticket_id, id))
    return "CustomerSupportTickets deleted successfully";
}

// GET CustomerSupportTickets BY AUTHOR
//  export const getCustomerSupportTicketsByAuthor = async (author: string): Promise<TICustomerSupportTickets[] | null> => {
//     return await db.query.CustomerSupportTickets.findMany({
//         where: eq(CustomerSupportTickets.author, author)
//     })
// }