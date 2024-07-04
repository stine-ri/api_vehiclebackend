import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const CustomerSupportTicketsSchema = z.object({
 
 
    subject: z.string(),
    description: z.string(),
    status: z.string(),

})

