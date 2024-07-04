
import { Hono } from "hono";
import { listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle, } from "./Vehicles.controller"
import { zValidator } from "@hono/zod-validator";
import { VehiclesSchema } from "./validator"; 

export const VehicleRouter = new Hono();
//get all Vehicles

VehicleRouter.get("/Vehicles", listVehicles)
//get a single Vehicle   api/Vehicles/1
VehicleRouter.get("/Vehicles/:id", getVehicle)
// create a Vehicle 
VehicleRouter.post("/Vehicles", zValidator('json', VehiclesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createVehicle)
//update a Vehicle
VehicleRouter.put("/Vehicles/:id", updateVehicle) 

VehicleRouter.delete("/Vehicles/:id", deleteVehicle)

//get Vehicles by author

// VehicleRouter.get("/Vehicles/author/:author", getAllVehiclesByAuthor)
