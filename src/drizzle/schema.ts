import { pgTable, serial, text, varchar, integer, primaryKey,decimal,boolean,timestamp,date,pgEnum} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// Users Table
export const users = pgTable("users", {
    id: serial("user_id").primaryKey(),
    full_name: text("full_name"),
    email: varchar("email", { length: 255 }).unique(),
    contact_phone: varchar("contact_phone", { length: 20 }),
    address: text("address"),
    role: varchar("role", { length: 10 }).default("user"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const usersRelations = relations(users, ({ many }) => ({
    bookings: many(Bookings),
    customer_support_tickets: many(CustomerSupportTickets),
}));
 
// Vehicle Specifications Table
export const VehicleSpecifications = pgTable("vehicle_specifications", {
    id: serial("vehicleSpec_id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 255 }),
    model: varchar("model", { length: 255 }),
    year: integer("year"),
    fuel_type: varchar("fuel_type", { length: 50 }),
    engine_capacity: varchar("engine_capacity", { length: 50 }),
    transmission: varchar("transmission", { length: 50 }),
    seating_capacity: integer("seating_capacity"),
    color: varchar("color", { length: 50 }),
    features: text("features"),
});
 
export const vehicleSpecificationsRelations = relations(VehicleSpecifications, ({ many }) => ({
    vehicles: many(Vehicles),
 
}));
 
// Vehicles Table
export const Vehicles = pgTable("vehicles", {
    id: serial("vehicle_id").primaryKey(),
    vehicleSpec_id: integer("vehicleSpec_id").notNull().references(() => VehicleSpecifications.id),
    rental_rate: decimal("rental_rate", { precision: 10, scale: 2 }),
    availability: boolean("availability").default(true),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const vehiclesRelations = relations(Vehicles, ({ one, many }) => ({
    vehicleSpecifications: one(VehicleSpecifications, {
        fields: [Vehicles.vehicleSpec_id],
        references: [VehicleSpecifications.id],
    }),
    bookings: many(Bookings),
    fleetManagement: many(FleetManagement),
}));
 
// Locations Table
export const Locations = pgTable("locations", {
    location_id: serial("location_id").primaryKey(),
    name: varchar("name", { length: 255 }),
    address: text("address"),
    contact_phone: varchar("contact_phone", { length: 20 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
// Bookings Table
export const Bookings = pgTable("bookings", {
    booking_id: serial("booking_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    vehicle_id: integer("vehicle_id").notNull().references(() => Vehicles.id),
    location_id: integer("location_id").notNull().references(() => Locations.location_id),
    booking_date: date("booking_date"),
    return_date: date("return_date"),
    total_amount: decimal("total_amount", { precision: 10, scale: 2 }),
    booking_status: varchar("booking_status", { length: 50 }).default("Pending"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const bookingsRelations = relations(Bookings, ({ one, many }) => ({
    user: one(users, {
        fields: [Bookings.user_id],
        references: [users.id],
    }),
    vehicle: one(Vehicles, {
        fields: [Bookings.vehicle_id],
        references: [Vehicles.id],
    }),
    location: one(Locations, {
        fields: [Bookings.location_id],
        references: [Locations.location_id],
    }),
    payments: many(Payments),
}));
 
// Payments Table
export const Payments = pgTable("payments", {
    payment_id: serial("payment_id").primaryKey(),
    booking_id: integer("booking_id").references(() => Bookings.booking_id),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    payment_status: varchar("payment_status", { length: 50 }).default("Pending"),
    payment_date: date("payment_date").defaultNow(),
    payment_method: varchar("payment_method", { length: 50 }),
    transaction_id: varchar("transaction_id", { length: 255 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const paymentsRelations = relations(Payments, ({ one }) => ({
    booking: one(Bookings, {
        fields: [Payments.booking_id],
        references: [Bookings.booking_id],
    }),
}));

// Customer Support Tickets Table
export const CustomerSupportTickets = pgTable("customer_support_tickets", {
    ticket_id: serial("ticket_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    subject: varchar("subject", { length: 255 }),
    description: text("description"),
    status: varchar("status", { length: 50 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const customerSupportTicketsRelations = relations(CustomerSupportTickets, ({ one }) => ({
    user: one(users, {
        fields: [CustomerSupportTickets.user_id],
        references: [users.id],
    }),
}));
 
// Fleet Management Table
export const FleetManagement = pgTable("fleet_management", {
    fleet_id: serial("fleet_id").primaryKey(),
    vehicle_id: integer("vehicle_id").notNull().references(() => Vehicles.id),
    acquisition_date: date("acquisition_date"),
    depreciation_rate: decimal("depreciation_rate", { precision: 5, scale: 2 }),
    current_value: decimal("current_value", { precision: 10, scale: 2 }),
    maintenance_cost: decimal("maintenance_cost", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 50 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const fleetManagementRelations = relations(FleetManagement, ({ one }) => ({
    vehicle: one(Vehicles, {
        fields: [FleetManagement.vehicle_id],
        references: [Vehicles.id],
    }),
}));
 
// Authentication Table
export const Authentication = pgTable("authentication", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    password: varchar("password"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
 
export const authenticationRelations = relations(Authentication, ({ one }) => ({
    user: one(users, {
        fields: [Authentication.user_id],
        references: [users.id],
    }),
}));
 


export const roleEnum = pgEnum("role", ["admin", "user"])

export const AuthOnUsersTable = pgTable("auth_on_users", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 90 }),
    username: varchar("username", { length: 90 }),
    role: roleEnum("role").default("user")
});

export const AuthOnUsersRelations = relations(AuthOnUsersTable, ({ one }) => ({
    users: one(users, {
        fields: [AuthOnUsersTable.userId],
        references: [users.id]
    })
}));

 
export type TIUsers = typeof users.$inferInsert;
export type TSUsers = typeof users.$inferSelect;

export type TIvehicleSpecifications = typeof VehicleSpecifications.$inferInsert;
export type TSvehicleSpecifications = typeof VehicleSpecifications.$inferSelect;
 
export type TIVehicles = typeof Vehicles.$inferInsert;
export type TSVehicles = typeof Vehicles.$inferSelect;
 
 
export type TILocations = typeof Locations.$inferInsert;
export type TSLocations = typeof Locations.$inferSelect;

export type TIBookings = typeof Bookings.$inferInsert;
export type TSBookings = typeof Bookings.$inferSelect;

export type TIPayments = typeof Payments.$inferInsert;
export type TSPayments = typeof Payments.$inferSelect;

export type TICustomerSupportTickets = typeof CustomerSupportTickets.$inferInsert;
export type TSCustomerSupportTickets = typeof CustomerSupportTickets.$inferSelect;

export type TIFleetManagement = typeof FleetManagement.$inferInsert;
export type TSFleetManagement = typeof FleetManagement.$inferSelect;

export type TIAuthentication = typeof Authentication.$inferInsert;
export type TSAuthentication = typeof Authentication.$inferSelect;

export type TIAuthOnUser = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUser = typeof AuthOnUsersTable.$inferSelect;