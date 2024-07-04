import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const usersSchema = z.object({
 
  full_name: z.string(),
  email:z.string(),
  contact_phone:z.string(),
  address: z.string(),
  role:z.string(),

})

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const registerUserSchema = z.object({
   userId: z.number(),
  username: z.string(),
  password: z.string(),
  // role: z.string().optional(),
  role: z.enum(["admin", "user",])
})

