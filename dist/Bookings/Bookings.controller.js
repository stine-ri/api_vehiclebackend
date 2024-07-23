"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.listBookings = void 0;
const Bookings_service_1 = require("./Bookings.service");
const listBookings = async (c) => {
    try {
        //limit the number of Bookings to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Bookings_service_1.BookingsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Booking not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listBookings = listBookings;
const getBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Booking = await (0, Bookings_service_1.getBookingservice)(id);
    if (Booking == undefined) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
};
exports.getBooking = getBooking;
const createBooking = async (c) => {
    try {
        const Booking = await c.req.json();
        // const password=Booking.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Booking.password=hashedPassword;
        const createdBooking = await (0, Bookings_service_1.createBookingservice)(Booking);
        if (!createdBooking)
            return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBooking = createBooking;
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Booking = await c.req.json();
    try {
        // search for the Booking
        const searchedBooking = await (0, Bookings_service_1.getBookingservice)(id);
        if (searchedBooking == undefined)
            return c.text("Booking not found", 404);
        // get the data and update it
        const res = await (0, Bookings_service_1.updateBookingservice)(id, Booking);
        // return a success message
        if (!res)
            return c.text("Booking not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the Booking
        const Booking = await (0, Bookings_service_1.getBookingservice)(id);
        if (Booking == undefined)
            return c.text("Booking not found", 404);
        //deleting the Booking
        const res = await (0, Bookings_service_1.deleteBookingservice)(id);
        if (!res)
            return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
// //get all Bookings by author
// export const getAllBookingsByAuthor = async (c: Context) => {
//     const author = c.req.param("author");
//     try {
//         if (!author) return c.text("Invalid author", 400);
//         //search for Booking
//         const Bookings = await getBookingsByAuthor(author);
//         if (Bookings === null) return c.text("Bookings not found", 404);
//         return c.json(Bookings, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }
