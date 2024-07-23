"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const users_router_1 = require("./users/users.router");
const vehicleSpecifications_router_1 = require("./vehicleSpecifications/vehicleSpecifications.router");
const Vehicles_router_1 = require("./Vehicles/Vehicles.router");
const Locations_router_1 = require("./Locations/Locations.router");
const Bookings_router_1 = require("./Bookings/Bookings.router");
const Payments_router_1 = require("./Payments/Payments.router");
const CustomerSupportTickets_router_1 = require("./CustomerSupportTickets/CustomerSupportTickets.router");
const FleetManagement_router_1 = require("./FleetManagement/FleetManagement.router");
const Authentication_router_1 = require("./Authentication/Authentication.router");
const stripe_router_1 = require("./stripe/stripe.router");
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
//default route//
app.get('/', (c) => {
    return c.text('the code is okay');
});
//middleware
app.use((0, cors_1.cors)({
    origin: "http://localhost:5173"
}));
//routehandlers
app.route("/api", users_router_1.userRouter);
app.route("/api", vehicleSpecifications_router_1.vehicleSpecificationsRouter);
app.route("/api", Vehicles_router_1.VehicleRouter);
app.route("/api", Locations_router_1.LocationRouter);
app.route("/api", Bookings_router_1.BookingRouter);
app.route("/api", Payments_router_1.PaymentRouter);
app.route("/api", CustomerSupportTickets_router_1.CustomerSupportTicketRouter);
app.route("/api", FleetManagement_router_1.FleetManagementRouter);
app.route("/api", Authentication_router_1.authRouter);
app.route("/api", stripe_router_1.stripeRouter);
console.log(`Server is running on port ${process.env.PORT}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
