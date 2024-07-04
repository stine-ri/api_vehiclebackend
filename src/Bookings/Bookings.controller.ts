
import { Context } from "hono";
import { BookingsService, getBookingservice, createBookingservice, updateBookingservice, deleteBookingservice,} from "./Bookings.service";
import*as bcrypt from "bcrypt";
export const listBookings = async (c: Context) => {
    try {
        //limit the number of Bookings to be returned

        const limit = Number(c.req.query('limit'))

        const data = await BookingsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Booking not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await getBookingservice(id);
    if (Booking == undefined) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
}
export const createBooking = async (c: Context) => {
    try {
        const Booking = await c.req.json();
        // const password=Booking.password;
        // const hashedPassword=await bcrypt.hash(password,10);
        // Booking.password=hashedPassword;
        const createdBooking = await createBookingservice(Booking);


        if (!createdBooking) return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await c.req.json();
    try {
        // search for the Booking
        const searchedBooking= await getBookingservice(id);
        if (searchedBooking == undefined) return c.text("Booking not found", 404);
        // get the data and update it
        const res = await updateBookingservice(id, Booking);
        // return a success message
        if (!res) return c.text("Booking not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBooking = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Booking
        const Booking = await getBookingservice(id);
        if (Booking== undefined) return c.text("Booking not found", 404);
        //deleting the Booking
        const res = await deleteBookingservice(id);
        if (!res) return c.text("Booking not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 
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