import { Hono } from "hono";
import { listvehicleSpecifications, getvehicleSpecification, createvehicleSpecification, updatevehicleSpecification, deletevehicleSpecification } from "./vehicleSpecifications.controller";
import { zValidator } from "@hono/zod-validator";
import { vehicleSpecificationSchema } from "./validator";

export const vehicleSpecificationsRouter = new Hono();

// Get all vehicle specifications
vehicleSpecificationsRouter.get("/vehicleSpecifications", listvehicleSpecifications);

// Get a single vehicle specification
vehicleSpecificationsRouter.get("/vehicleSpecifications/:id", getvehicleSpecification);

// Create a vehicle specification
vehicleSpecificationsRouter.post("/vehicleSpecifications", zValidator('json', vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createvehicleSpecification);

// Update a vehicle specification
vehicleSpecificationsRouter.put("/vehicleSpecifications/:id", updatevehicleSpecification);

// Delete a vehicle specification
vehicleSpecificationsRouter.delete("/vehicleSpecifications/:id", deletevehicleSpecification);
