import { serve } from '@hono/node-server'
import { Hono,} from 'hono'
import { userRouter } from './users/users.router'
import { vehicleSpecificationsRouter} from  './vehicleSpecifications/vehicleSpecifications.router'
import { VehicleRouter } from './Vehicles/Vehicles.router'
import { LocationRouter } from './Locations/Locations.router'
import { BookingRouter } from './Bookings/Bookings.router'
import { PaymentRouter } from './Payments/Payments.router'
import { CustomerSupportTicketRouter } from './CustomerSupportTickets/CustomerSupportTickets.router'
import { FleetManagementRouter } from './FleetManagement/FleetManagement.router'
import { authRouter} from './Authentication/Authentication.router'
 import {stripeRouter} from './stripe/stripe.router'
import { jwt } from 'hono/jwt';
import {cors} from 'hono/cors'


const app = new Hono()

//default route//
app.get('/', (c) => {
  return c.text('the code is okay')
})
//middleware
app.use(cors({
  origin: "http://localhost:5173"
}))
//routehandlers
app.route("/api",userRouter)
app.route("/api",vehicleSpecificationsRouter)
app.route("/api",VehicleRouter)
app.route("/api",LocationRouter)
app.route("/api",BookingRouter)
app.route("/api",PaymentRouter)
app.route("/api",CustomerSupportTicketRouter)
app.route("/api",FleetManagementRouter)
app.route("/api",authRouter)
app.route("/api",stripeRouter)
console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT)
})
