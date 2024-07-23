"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentservice = exports.updatePaymentservice = exports.createPaymentservice = exports.getPaymentservice = exports.PaymentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const PaymentsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.Payments.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.Payments.findMany();
};
exports.PaymentsService = PaymentsService;
const getPaymentservice = async (id) => {
    return await db_1.default.query.Payments.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Payments.payment_id, id)
    });
};
exports.getPaymentservice = getPaymentservice;
const createPaymentservice = async (Payment) => {
    await db_1.default.insert(schema_1.Payments).values(Payment);
    return "Payment created successfully";
};
exports.createPaymentservice = createPaymentservice;
const updatePaymentservice = async (id, Payment) => {
    await db_1.default.update(schema_1.Payments).set(Payment).where((0, drizzle_orm_1.eq)(schema_1.Payments.payment_id, id));
    return "Payment updated successfully";
};
exports.updatePaymentservice = updatePaymentservice;
const deletePaymentservice = async (id) => {
    await db_1.default.delete(schema_1.Payments).where((0, drizzle_orm_1.eq)(schema_1.Payments.payment_id, id));
    return "Payment deleted successfully";
};
exports.deletePaymentservice = deletePaymentservice;
// GET Payments BY AUTHOR
//  export const getPaymentsByAuthor = async (author: string): Promise<TIPayments[] | null> => {
//     return await db.query.Payments.findMany({
//         where: eq(Payments.author, author)
//     })
// }
