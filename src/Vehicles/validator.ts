import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const VehiclesSchema = z.object({
 
    vehicleSpec_id: z.number(),
    rental_rate: z.number(),
    availability:z. boolean(),

})

