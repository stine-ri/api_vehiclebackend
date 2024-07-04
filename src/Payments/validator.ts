import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const PaymentsSchema = z.object({
  
  amount: z.number(),
  payment_status: z.string(),
  payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  payment_method: z.string(),
  transaction_id: z.string(),

})

