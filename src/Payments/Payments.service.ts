
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIPayments, TSPayments, Payments, } from "../drizzle/schema";

export const PaymentsService = async (limit?: number): Promise<TSPayments[] | null> => {
    if (limit) {
        return await db.query.Payments.findMany({
            limit: limit
        });
    }
    return await db.query.Payments.findMany();
}

export const getPaymentservice = async (id: number): Promise<TIPayments | undefined> => {
    return await db.query.Payments.findFirst({
        where: eq(Payments.payment_id, id)
    })
}

export const createPaymentservice = async (Payment: TIPayments) => {
    await db.insert(Payments).values(Payment)
    return "Payment created successfully";
}

export const updatePaymentservice = async (id: number, Payment: TIPayments) => {
    await db.update(Payments).set(Payment).where(eq(Payments.payment_id, id))
    return "Payment updated successfully";
}

export const deletePaymentservice = async (id: number) => {
    await db.delete(Payments).where(eq(Payments.payment_id, id))
    return "Payment deleted successfully";
}

// GET Payments BY AUTHOR
//  export const getPaymentsByAuthor = async (author: string): Promise<TIPayments[] | null> => {
//     return await db.query.Payments.findMany({
//         where: eq(Payments.author, author)
//     })
// }