import { integer } from 'drizzle-orm/pg-core'
import { z } from 'zod'


export const FleetManagementSchema = z.object({
 
    vehicle_id: z.number(),
    acquisition_date: z.string(),
    depreciation_rate: z.number(),
    current_value: z.number(),
    maintenance_cost: z.number(),
    status: z.string(),

})

