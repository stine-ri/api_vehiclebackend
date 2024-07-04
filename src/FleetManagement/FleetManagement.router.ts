
import { Hono } from "hono";
import { listFleetManagement, getFleetManagement, createFleetManagement, updateFleetManagement, deleteFleetManagement, } from "./FleetManagement.controller"
import { zValidator } from "@hono/zod-validator";
import { FleetManagementSchema } from "./validator"; 

export const FleetManagementRouter = new Hono();
//get all FleetManagement

FleetManagementRouter.get("/FleetManagement", listFleetManagement)
//get a single FleetManagement   api/FleetManagement/1
FleetManagementRouter.get("/FleetManagement/:id", getFleetManagement)
// create a FleetManagement 
FleetManagementRouter.post("/FleetManagement", zValidator('json', FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createFleetManagement)
//update a FleetManagement
FleetManagementRouter.put("/FleetManagement/:id", updateFleetManagement) 

FleetManagementRouter.delete("/FleetManagement/:id", deleteFleetManagement)

//get FleetManagement by author

// FleetManagementRouter.get("/FleetManagement/author/:author", getAllFleetManagementByAuthor)
