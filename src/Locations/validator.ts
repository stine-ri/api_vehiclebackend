import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const LocationsSchema = z.object({
 
  "name": z.string(),
  "address": z.string(),
  "contact_phone": z.string(),

})

