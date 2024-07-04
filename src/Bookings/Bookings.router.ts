
import { Hono } from "hono";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking, } from "./Bookings.controller"
import { zValidator } from "@hono/zod-validator";
import { BookingsSchema } from "./validator"; 

export const BookingRouter = new Hono();
//get all Bookings

BookingRouter.get("/Bookings", listBookings)
//get a single Booking   api/Bookings/1
BookingRouter.get("/Bookings/:id", getBooking)
// create a Booking 
BookingRouter.post("/Bookings", zValidator('json', BookingsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createBooking)
//update a Booking
BookingRouter.put("/Bookings/:id", updateBooking) 

BookingRouter.delete("/Bookings/:id", deleteBooking)

//get Bookings by author

// BookingRouter.get("/Bookings/author/:author", getAllBookingsByAuthor)
