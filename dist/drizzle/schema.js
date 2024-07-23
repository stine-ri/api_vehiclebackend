"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRelations = exports.Authentication = exports.roleEnum = exports.fleetManagementRelations = exports.FleetManagement = exports.customerSupportTicketsRelations = exports.CustomerSupportTickets = exports.paymentsRelations = exports.Payments = exports.bookingsRelations = exports.Bookings = exports.Locations = exports.vehiclesRelations = exports.Vehicles = exports.vehicleSpecificationsRelations = exports.VehicleSpecifications = exports.usersRelations = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Users Table
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("user_id").primaryKey(),
    full_name: (0, pg_core_1.text)("username"),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).unique(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }),
    address: (0, pg_core_1.text)("address"),
    role: (0, pg_core_1.varchar)("role", { length: 10 }).default("user"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    bookings: many(exports.Bookings),
    customer_support_tickets: many(exports.CustomerSupportTickets),
}));
// Vehicle Specifications Table
exports.VehicleSpecifications = (0, pg_core_1.pgTable)("vehicle_specifications", {
    id: (0, pg_core_1.serial)("vehicleSpec_id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 255 }),
    model: (0, pg_core_1.varchar)("model", { length: 255 }),
    year: (0, pg_core_1.integer)("year"),
    fuel_type: (0, pg_core_1.varchar)("fuel_type", { length: 50 }),
    engine_capacity: (0, pg_core_1.varchar)("engine_capacity", { length: 50 }),
    transmission: (0, pg_core_1.varchar)("transmission", { length: 50 }),
    seating_capacity: (0, pg_core_1.integer)("seating_capacity"),
    color: (0, pg_core_1.varchar)("color", { length: 50 }),
    features: (0, pg_core_1.text)("features"),
});
exports.vehicleSpecificationsRelations = (0, drizzle_orm_1.relations)(exports.VehicleSpecifications, ({ many }) => ({
    vehicles: many(exports.Vehicles),
}));
// Vehicles Table
exports.Vehicles = (0, pg_core_1.pgTable)("vehicles", {
    id: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    vehicleSpec_id: (0, pg_core_1.integer)("vehicleSpec_id").notNull().references(() => exports.VehicleSpecifications.id),
    rental_rate: (0, pg_core_1.decimal)("rental_rate", { precision: 10, scale: 2 }),
    availability: (0, pg_core_1.boolean)("availability").default(true),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.Vehicles, ({ one, many }) => ({
    vehicleSpecifications: one(exports.VehicleSpecifications, {
        fields: [exports.Vehicles.vehicleSpec_id],
        references: [exports.VehicleSpecifications.id],
    }),
    bookings: many(exports.Bookings),
    fleetManagement: many(exports.FleetManagement),
}));
// Locations Table
exports.Locations = (0, pg_core_1.pgTable)("locations", {
    location_id: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }),
    address: (0, pg_core_1.text)("address"),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// Bookings Table
exports.Bookings = (0, pg_core_1.pgTable)("bookings", {
    booking_id: (0, pg_core_1.serial)("booking_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").notNull().references(() => exports.Vehicles.id),
    location_id: (0, pg_core_1.integer)("location_id").notNull().references(() => exports.Locations.location_id),
    booking_date: (0, pg_core_1.date)("booking_date"),
    return_date: (0, pg_core_1.date)("return_date"),
    total_amount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }),
    booking_status: (0, pg_core_1.varchar)("booking_status", { length: 50 }).default("Pending"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.Bookings, ({ one, many }) => ({
    user: one(exports.users, {
        fields: [exports.Bookings.user_id],
        references: [exports.users.id],
    }),
    vehicle: one(exports.Vehicles, {
        fields: [exports.Bookings.vehicle_id],
        references: [exports.Vehicles.id],
    }),
    location: one(exports.Locations, {
        fields: [exports.Bookings.location_id],
        references: [exports.Locations.location_id],
    }),
    payments: many(exports.Payments),
}));
// Payments Table
exports.Payments = (0, pg_core_1.pgTable)("payments", {
    payment_id: (0, pg_core_1.serial)("payment_id").primaryKey(),
    booking_id: (0, pg_core_1.integer)("booking_id").references(() => exports.Bookings.booking_id),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }),
    payment_status: (0, pg_core_1.varchar)("payment_status", { length: 50 }).default("Pending"),
    payment_date: (0, pg_core_1.date)("payment_date").defaultNow(),
    payment_method: (0, pg_core_1.varchar)("payment_method", { length: 50 }),
    transaction_id: (0, pg_core_1.varchar)("transaction_id", { length: 255 }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.Payments, ({ one }) => ({
    booking: one(exports.Bookings, {
        fields: [exports.Payments.booking_id],
        references: [exports.Bookings.booking_id],
    }),
}));
// Customer Support Tickets Table
exports.CustomerSupportTickets = (0, pg_core_1.pgTable)("customer_support_tickets", {
    ticket_id: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    subject: (0, pg_core_1.varchar)("subject", { length: 255 }),
    description: (0, pg_core_1.text)("description"),
    status: (0, pg_core_1.varchar)("status", { length: 50 }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.customerSupportTicketsRelations = (0, drizzle_orm_1.relations)(exports.CustomerSupportTickets, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.CustomerSupportTickets.user_id],
        references: [exports.users.id],
    }),
}));
// Fleet Management Table
exports.FleetManagement = (0, pg_core_1.pgTable)("fleet_management", {
    fleet_id: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").notNull().references(() => exports.Vehicles.id),
    acquisition_date: (0, pg_core_1.date)("acquisition_date"),
    depreciation_rate: (0, pg_core_1.decimal)("depreciation_rate", { precision: 5, scale: 2 }),
    current_value: (0, pg_core_1.decimal)("current_value", { precision: 10, scale: 2 }),
    maintenance_cost: (0, pg_core_1.decimal)("maintenance_cost", { precision: 10, scale: 2 }),
    status: (0, pg_core_1.varchar)("status", { length: 50 }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.fleetManagementRelations = (0, drizzle_orm_1.relations)(exports.FleetManagement, ({ one }) => ({
    vehicle: one(exports.Vehicles, {
        fields: [exports.FleetManagement.vehicle_id],
        references: [exports.Vehicles.id],
    }),
}));
// Authentication Table
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user"]);
exports.Authentication = (0, pg_core_1.pgTable)("authentication", {
    auth_id: (0, pg_core_1.serial)("auth_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    password: (0, pg_core_1.varchar)("password"),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).unique(),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.authenticationRelations = (0, drizzle_orm_1.relations)(exports.Authentication, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.Authentication.user_id],
        references: [exports.users.id],
    }),
}));
