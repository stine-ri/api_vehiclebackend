"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const hono_1 = require("hono");
const Bookings_controller_1 = require("./Bookings.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("./validator");
exports.BookingRouter = new hono_1.Hono();
//get all Bookings
exports.BookingRouter.get("/Bookings", Bookings_controller_1.listBookings);
//get a single Booking   api/Bookings/1
exports.BookingRouter.get("/Bookings/:id", Bookings_controller_1.getBooking);
// create a Booking 
exports.BookingRouter.post("/Bookings", (0, zod_validator_1.zValidator)('json', validator_1.BookingsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Bookings_controller_1.createBooking);
//update a Booking
exports.BookingRouter.put("/Bookings/:id", Bookings_controller_1.updateBooking);
exports.BookingRouter.delete("/Bookings/:id", Bookings_controller_1.deleteBooking);
//get Bookings by author
// BookingRouter.get("/Bookings/author/:author", getAllBookingsByAuthor)
