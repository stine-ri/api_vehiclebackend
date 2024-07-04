
import { Hono } from "hono";
import { listPayments, getPayment, createPayment, updatePayment, deletePayment, } from "./Payments.controller"
import { zValidator } from "@hono/zod-validator";
import { PaymentsSchema } from "./validator"; 

export const PaymentRouter = new Hono();
//get all Payments

PaymentRouter.get("/Payments", listPayments)
//get a single Payment   api/Payments/1
PaymentRouter.get("/Payments/:id", getPayment)
// create a Payment 
PaymentRouter.post("/Payments", zValidator('json', PaymentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createPayment)
//update a Payment
PaymentRouter.put("/Payments/:id", updatePayment) 

PaymentRouter.delete("/Payments/:id", deletePayment)

//get Payments by author

// PaymentRouter.get("/Payments/author/:author", getAllPaymentsByAuthor)
