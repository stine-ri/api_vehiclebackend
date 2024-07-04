
import { Hono } from "hono";
import { listLocations, getLocation, createLocation, updateLocation, deleteLocation, } from "./Locations.controller"
import { zValidator } from "@hono/zod-validator";
import { LocationsSchema } from "./validator"; 

export const LocationRouter = new Hono();
//get all Locations

LocationRouter.get("/Locations", listLocations)
//get a single Location   api/Locations/1
LocationRouter.get("/Locations/:id", getLocation)
// create a Location 
LocationRouter.post("/Locations", zValidator('json', LocationsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createLocation)
//update a Location
LocationRouter.put("/Locations/:id", updateLocation) 

LocationRouter.delete("/Locations/:id", deleteLocation)

//get Locations by author

// LocationRouter.get("/Locations/author/:author", getAllLocationsByAuthor)
