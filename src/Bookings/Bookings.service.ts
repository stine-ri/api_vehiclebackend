
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBookings, TSBookings, Bookings, } from "../drizzle/schema";

export const BookingsService = async (limit?: number): Promise<TSBookings[] | null> => {
    if (limit) {
        return await db.query.Bookings.findMany({
            limit: limit
        });
    }
    return await db.query.Bookings.findMany();
}

export const getBookingservice = async (id: number): Promise<TIBookings | undefined> => {
    return await db.query.Bookings.findFirst({
        where: eq(Bookings.booking_id, id)
    })
}

export const createBookingservice = async (Booking: TIBookings) => {
    await db.insert(Bookings).values(Booking)
    return "Booking created successfully";
}

export const updateBookingservice = async (id: number, Booking: TIBookings) => {
    await db.update(Bookings).set(Booking).where(eq(Bookings.booking_id, id))
    return "Booking updated successfully";
}

export const deleteBookingservice = async (id: number) => {
    await db.delete(Bookings).where(eq(Bookings.booking_id, id))
    return "Booking deleted successfully";
}

// GET Bookings BY AUTHOR
//  export const getBookingsByAuthor = async (author: string): Promise<TIBookings[] | null> => {
//     return await db.query.Bookings.findMany({
//         where: eq(Bookings.author, author)
//     })
// }