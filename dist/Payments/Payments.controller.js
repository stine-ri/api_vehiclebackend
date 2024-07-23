"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.listPayments = void 0;
const Payments_service_1 = require("./Payments.service");
const listPayments = async (c) => {
    try {
        //limit the number of Payments to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Payments_service_1.PaymentsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Payment not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listPayments = listPayments;
const getPayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Payment = await (0, Payments_service_1.getPaymentservice)(id);
    if (Payment == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(Payment, 200);
};
exports.getPayment = getPayment;
const createPayment = async (c) => {
    try {
        const Payment = await c.req.json();
        // const password=Payment.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Payment.password=hashedPassword;
        const createdPayment = await (0, Payments_service_1.createPaymentservice)(Payment);
        if (!createdPayment)
            return c.text("Payment not created", 404);
        return c.json({ msg: createdPayment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createPayment = createPayment;
const updatePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Payment = await c.req.json();
    try {
        // search for the Payment
        const searchedPayment = await (0, Payments_service_1.getPaymentservice)(id);
        if (searchedPayment == undefined)
            return c.text("Payment not found", 404);
        // get the data and update it
        const res = await (0, Payments_service_1.updatePaymentservice)(id, Payment);
        // return a success message
        if (!res)
            return c.text("Payment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the Payment
        const Payment = await (0, Payments_service_1.getPaymentservice)(id);
        if (Payment == undefined)
            return c.text("Payment not found", 404);
        //deleting the Payment
        const res = await (0, Payments_service_1.deletePaymentservice)(id);
        if (!res)
            return c.text("Payment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePayment = deletePayment;
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
