
import { Context } from "hono";
import { PaymentsService, getPaymentservice, createPaymentservice, updatePaymentservice, deletePaymentservice,} from "./Payments.service";
import*as bcrypt from "bcrypt";
export const listPayments = async (c: Context) => {
    try {
        //limit the number of Payments to be returned

        const limit = Number(c.req.query('limit'))

        const data = await PaymentsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Payment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Payment = await getPaymentservice(id);
    if (Payment == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(Payment, 200);
}
export const createPayment = async (c: Context) => {
    try {
        const Payment = await c.req.json();
        // const password=Payment.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Payment.password=hashedPassword;
        const createdPayment = await createPaymentservice(Payment);


        if (!createdPayment) return c.text("Payment not created", 404);
        return c.json({ msg: createdPayment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Payment = await c.req.json();
    try {
        // search for the Payment
        const searchedPayment= await getPaymentservice(id);
        if (searchedPayment == undefined) return c.text("Payment not found", 404);
        // get the data and update it
        const res = await updatePaymentservice(id, Payment);
        // return a success message
        if (!res) return c.text("Payment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletePayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Payment
        const Payment = await getPaymentservice(id);
        if (Payment== undefined) return c.text("Payment not found", 404);
        //deleting the Payment
        const res = await deletePaymentservice(id);
        if (!res) return c.text("Payment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
// //get all Payments by author
// export const getAllPaymentsByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for Payment
//         const Payments = await getPaymentsByAuthor(author);
//         if (Payments === null) return c.text("Payments not found", 404);
//         return c.json(Payments, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }