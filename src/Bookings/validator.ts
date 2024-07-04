import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const BookingsSchema = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    location_id:z.number(),
    booking_date: z.string(),
    return_date: z.string(),
    total_amount: z.number(),
    booking_status: z.string()

})

