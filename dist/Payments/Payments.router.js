"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const hono_1 = require("hono");
const Payments_controller_1 = require("./Payments.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.PaymentRouter = new hono_1.Hono();
//get all Payments
exports.PaymentRouter.get("/Payments", Payments_controller_1.listPayments);
//get a single Payment   api/Payments/1
exports.PaymentRouter.get("/Payments/:id", Payments_controller_1.getPayment);
// create a Payment 
exports.PaymentRouter.post("/Payments", (0, zod_validator_1.zValidator)('json', validator_1.PaymentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Payments_controller_1.createPayment);
//update a Payment
exports.PaymentRouter.put("/Payments/:id", Payments_controller_1.updatePayment);
exports.PaymentRouter.delete("/Payments/:id", Payments_controller_1.deletePayment);
//get Payments by author
// PaymentRouter.get("/Payments/author/:author", getAllPaymentsByAuthor)
