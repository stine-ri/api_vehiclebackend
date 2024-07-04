import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'

 export const vehicleSpecificationSchema = z.object({
  manufacturer: z.string(),
  model: z.string(),
  year: z.number(),
  fuelType: z.string(),
  engineCapacity: z.string(),
  transmission: z.string(),
  seatingCapacity: z.number(),
  color: z.string(),
  features: z.string(),
});



