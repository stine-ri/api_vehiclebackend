"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingservice = exports.updateBookingservice = exports.createBookingservice = exports.getBookingservice = exports.BookingsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const BookingsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.Bookings.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.Bookings.findMany();
};
exports.BookingsService = BookingsService;
const getBookingservice = async (id) => {
    return await db_1.default.query.Bookings.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Bookings.booking_id, id)
    });
};
exports.getBookingservice = getBookingservice;
const createBookingservice = async (Booking) => {
    await db_1.default.insert(schema_1.Bookings).values(Booking);
    return "Booking created successfully";
};
exports.createBookingservice = createBookingservice;
const updateBookingservice = async (id, Booking) => {
    await db_1.default.update(schema_1.Bookings).set(Booking).where((0, drizzle_orm_1.eq)(schema_1.Bookings.booking_id, id));
    return "Booking updated successfully";
};
exports.updateBookingservice = updateBookingservice;
const deleteBookingservice = async (id) => {
    await db_1.default.delete(schema_1.Bookings).where((0, drizzle_orm_1.eq)(schema_1.Bookings.booking_id, id));
    return "Booking deleted successfully";
};
exports.deleteBookingservice = deleteBookingservice;
// GET Bookings BY AUTHOR
//  export const getBookingsByAuthor = async (author: string): Promise<TIBookings[] | null> => {
//     return await db.query.Bookings.findMany({
//         where: eq(Bookings.author, author)
//     })
// }
