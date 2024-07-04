import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const AuthenticationSchema = z.object({
 
  user_id: z.number(),
  password: z.string(),

})

